import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as cron from 'node-cron';
import { FREE_STATUS } from 'src/libs/status.libs';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Table } from 'src/schemas/tables/tableSchema';
import { User } from 'src/schemas/users.schema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';

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
  ) {
    this.initializeCronJobs();
  }

  private initializeCronJobs() {
    // Ejecutar una tarea cada minuto
    cron.schedule('59 * * * *', async () => {
      console.log(new Date().toLocaleDateString());
      const newOperatingPeriod = new this.operatingPeriodModel();
      await newOperatingPeriod.save();
      return newOperatingPeriod;
    });

    // se limpian las sesiones de los ussuArios
    cron.schedule('0 0 * * * ', async () => {
      const UserUpdated = await this.userModel.updateMany(
        {},
        { $set: { cashierSession: null } },
      );
      if (UserUpdated) {
        console.log('registro de usuarios reseteado  con exito');
      }
    });
    // se limpian las sesiones de los ussuArios
    cron.schedule('59 * * * * ', async () => {
      const tableUpdated = await this.tableModel.updateMany(
        {},
        { $set: { status: FREE_STATUS, bill: [] } },
      );
      if (tableUpdated) {
        console.log('Mesas liberadas con exito');
      }
    });

    cron.schedule('59 * * * * ', async () => {
      const deletedBills = await this.billsModel.deleteMany({});
      if (deletedBills) {
        console.log('cuentas eliminadas con exito');
      }
    });

    cron.schedule('59 * * * * ', async () => {
      const deletedNotes = await this.notesModel.deleteMany({});
      if (deletedNotes) {
        console.log('notas eliminadas con exito');
      }
    });

    cron.schedule('10 21 * * * ', async () => {
      const UserUpdated = await this.userModel.updateMany(
        {},
        { $set: { dailyRegister: null } },
      );
      if (UserUpdated) {
        console.log('registro de usuarios reseteado  con exito');
      }
    });
  }
}
