import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as cron from 'node-cron';
import { FREE_STATUS } from 'src/libs/status.libs';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { Branch } from 'src/schemas/business/branchSchema';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Table } from 'src/schemas/tables/tableSchema';
import { User } from 'src/schemas/users.schema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';
import { PhoneOrder } from 'src/schemas/ventas/orders/phoneOrder.schema';
import { RappiOrder } from 'src/schemas/ventas/orders/rappiOrder.schema';
import { ToGoOrder } from 'src/schemas/ventas/orders/toGoOrder.schema';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Bills.name) private billsModel: Model<Bills>,
    @InjectModel(Notes.name) private notesModel: Model<Notes>,
    @InjectModel(Table.name) private tableModel: Model<Table>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(ToGoOrder.name) private toGoOrderModel: Model<ToGoOrder>,
    @InjectModel(RappiOrder.name) private rappiOrderModel: Model<RappiOrder>,
    @InjectModel(PhoneOrder.name) private phoneOrderModel: Model<PhoneOrder>,
    private readonly operatingPeriodService: OperatingPeriodService,
  ) {
    this.initializeCronJobs();
  }

  async initializeCronJobs() {
    /* //////////////////////////////////////////////////////////
    /////  METODOS PARA EJECUTAR CRON JOBS AL INICIAR EL DIA ////
    ////////////////////////////////////////////////////////// */
    const branchId = '66bd36e5a107f6584ef54dca';
    const branch = await this.branchModel.findById(branchId);
    if (!branch) {
      throw new Error('No se encontro la branch');
    }

    const { initOperatingPeriod, closeOperatingPeriod } = branch;

    const [openingHour, openingMinute] = initOperatingPeriod
      .split(':')
      .map((num) => parseInt(num, 10));
    const [closingHour, closingMinute] = closeOperatingPeriod
      .split(':')
      .map((num) => parseInt(num, 10));

    // Validación de horas y minutos
    if (
      isNaN(openingHour) ||
      isNaN(openingMinute) ||
      isNaN(closingHour) ||
      isNaN(closingMinute) ||
      openingHour < 0 ||
      openingHour > 23 ||
      openingMinute < 0 ||
      openingMinute > 59 ||
      closingHour < 0 ||
      closingHour > 23 ||
      closingMinute < 0 ||
      closingMinute > 59
    ) {
      console.log('Formato de hora/minuto inválido en la sucursal');
      return;
    }
    // Programa el cron job para iniciar el período operativo
    // const startCronExpression = `${openingMinute} ${openingHour} * * *`;
    const startCronExpression = `*/6 * * * *`;

    cron.schedule(startCronExpression, async () => {
      ///////////////////////////////////////////////////////////////////
      // Aquí se cierra el actual periodo operativo actual //////////////
      ///////////////////////////////////////////////////////////////////

      const currentPeriodId = branch.operatingPeriod;

      const updatedPeriod = await this.operatingPeriodService.closePeriod(
        currentPeriodId.toString(),
      );

      if (!updatedPeriod) {
        // throw new Error('No se pudo cerrar el periodo operativo');
        console.log('No se pudo cerrar el periodo operativo');
      }

      ////////////////////////////////////////////////////////////////////
      // Aquí se crea el nuevo periodo operativo /////////////////////////
      ////////////////////////////////////////////////////////////////////
      const session = await this.branchModel.startSession();
      session.startTransaction();
      try {
        const newOperatingPeriod = new this.operatingPeriodModel();
        await newOperatingPeriod.save();
        if (!newOperatingPeriod) {
          await session.abortTransaction();
          session.endSession();
          throw new Error('No se pudo crear el nuevo periodo operativo');
        }
        // vamos a actualizar la branch en su key operatingperiod si no hay ninguno metemos el nuevo y hay ya hay uno lo reemplazamos
        const updatedBranch = await this.branchModel.findByIdAndUpdate(
          branchId,
          {
            operatingPeriod: newOperatingPeriod._id,
          },
        );
        if (!updatedBranch) {
          await session.abortTransaction();
          session.endSession();
          throw new Error('No se pudo actualizar la branch');
        }

        const UserUpdated = await this.userModel.updateMany(
          {},
          { $set: { cashierSession: null, dailyRegister: null } },
        );
        if (!UserUpdated) {
          await session.abortTransaction();
          session.endSession();
          throw new Error('No se pudieron actualizar los usuarios');
        }

        const tableUpdated = await this.tableModel.updateMany(
          {},
          {
            $set: {
              status: FREE_STATUS,
              bill: [],
              availability: true,
              joinedTables: [],
              diners: 1,
            },
          },
        );
        if (!tableUpdated) {
          await session.abortTransaction();
          session.endSession();
          throw new Error('No se pudieron actualizar las mesas');
        }
        /*
        // Eliminar ordenes, esto sera solo en pruebas no en producción 🚩⚠
        await this.billsModel.deleteMany({});
        await this.notesModel.deleteMany({});
        await this.toGoOrderModel.deleteMany({});
        await this.rappiOrderModel.deleteMany({});
        await this.phoneOrderModel.deleteMany({});

        */

        await session.commitTransaction();
        session.endSession();
      } catch (error) {
        await session.abortTransaction();
      } finally {
        session.endSession();
      }
    });

    // Programa el cron job para finalizar el período operativo
    const endCronExpression = `${closingMinute} ${closingHour} * * *`;
    cron.schedule(endCronExpression, async () => {
      const session = await this.branchModel.startSession();
      session.startTransaction();
      try {
        // Lógica para manejar el fin del período operativo
        const currentPeriod = this.operatingPeriodService.getCurrent();
        if (!currentPeriod) {
          throw new Error('No se encontro el periodo operativo actual');
        }
        // Aquí podrías, por ejemplo, actualizar el estado de la sucursal en la base de datos

        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
      } finally {
        session.endSession();
      }
    });
  }
}
