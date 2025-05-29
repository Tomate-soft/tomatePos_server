import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createCashWithdrawDto } from 'src/dto/cashierSession/cashWithdraw/createCashWithdraw';

import { createCashierSessionDto } from 'src/dto/cashierSession/createCashierSession';
import { updateCashierSessionDto } from 'src/dto/cashierSession/updateCashierSession';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { CashWithdraw } from 'src/schemas/cashierSession/cashWithdraw';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class CashierSessionService {
  constructor(
    @InjectModel(CashierSession.name)
    private cashierSessionModel: Model<CashierSession>,
    @InjectModel(OperatingPeriod.name)
    private readonly operatingPeriodModel: Model<OperatingPeriod>,
    private readonly operatingPeriodService: OperatingPeriodService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(CashWithdraw.name)
    private readonly cashWithdrawModel: Model<CashWithdraw>,
  ) {}

  async findAll() {
    return await this.cashierSessionModel
      .find()
      .populate({ path: 'bills', populate: [{ path: 'notes' }] })
      .populate({
        path: 'user',
      });
  }

  async findOne(id: string) {
    return await this.cashierSessionModel.findById(id);
  }

  async delete(id: string) {
    return await this.cashierSessionModel.findByIdAndDelete(id);
  }

  async create(body: createCashierSessionDto) {
    const data = { ...body, startDate: new Date().toISOString() };

    // Crear nueva sesión de cajero
    const newSession = new this.cashierSessionModel(data);
    await newSession.save();

    // Obtener el último documento de operatingPeriodModel
    const updatedOperatingPeriod = await this.operatingPeriodModel
      .findOne()
      .sort({ _id: -1 });

    if (updatedOperatingPeriod && newSession._id) {
      const sellProcess = [...updatedOperatingPeriod.sellProcess, newSession];

      // Actualizar operatingPeriodModel con la nueva sesión si existe
      await this.operatingPeriodModel.findByIdAndUpdate(
        updatedOperatingPeriod._id,
        { sellProcess },
        { new: true }, // Devuelve el documento actualizado
      );
    }
    let cashierName = '';

    if (newSession._id) {
      try {
        const updatedUser = await this.userModel.findByIdAndUpdate(
          body.user,
          { cashierSession: newSession._id },
          { new: true },
        );
        cashierName = ` ${updatedUser.employeeNumber} ${updatedUser.name} ${updatedUser.lastName}`;
      } catch (error) {
        throw new NotFoundException(
          'No se completo la actualizacion de usuario',
        );
      }
    } //
    const periodDate = new Date(updatedOperatingPeriod.createdAt).toISOString();

    // Se retorna la nueva sesión creada
    return {
      ...newSession.toObject(),
      periodDate,
      cashierName,
    };
  }

  async update(id: string, body: updateCashierSessionDto) {
    return await this.cashierSessionModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async updateBillForPayment(id: string, body: updateCashierSessionDto) {
    const session = await this.cashierSessionModel.startSession();
    session.startTransaction();
    try {
      const currentSession = await this.cashierSessionModel.findById(id);

      console.log(currentSession.bills);
      if (!currentSession) {
        throw new NotFoundException('No se pudo actualizar');
      }
      const res = await this.cashierSessionModel.findByIdAndUpdate(
        id,
        {
          bills: [
            ...new Set([
              ...currentSession.bills.map((bill: any) => bill.toString()),
              ...body.bills,
            ]),
          ],
        },
        { new: true },
      );

      /*
        if (!currentSession.bills.includes(body.bills)) {
        const res = await this.cashierSessionModel.findByIdAndUpdate(
          id,
          { bills: [...currentSession.bills].concat(body.bills) },
          {
            new: true,
          },
        );
      }
      */
      await session.commitTransaction();
      session.endSession();
      return res;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(
        `Hubo un error inesperado surante la sesion, mas informacion: ${error}`,
      );
    }
  }
  // ver si hay dinero para realizar el retiro
  // ya que creamos el retiro lo metemos a la session del cajero
  async cashWithdrawal(body: createCashWithdrawDto) {
    const session = await this.cashierSessionModel.startSession();
    const currentPeriod = await this.operatingPeriodService.getCurrent();
    const newWithdraw = await session.withTransaction(async () => {
      const currentSession = await this.cashierSessionModel.findById(
        body.sessionId,
      );
      const newWithdraw = new this.cashWithdrawModel(body);
      await newWithdraw.save();

      await this.cashierSessionModel.findByIdAndUpdate(
        body.sessionId,
        { cashWithdraw: [...currentSession.cashWithdraw, newWithdraw] },
        {
          new: true,
        },
      );

      const periodUpdated = await this.operatingPeriodModel.findByIdAndUpdate(
        currentPeriod[0]?._id,
        {
          moneyMovements: [...currentPeriod[0]?.moneyMovements, newWithdraw],
        },
      );

      if (!periodUpdated) {
        throw new NotFoundException(
          'No se completo la actualizacion de usuario',
        );
      }
      await session.commitTransaction();
      session.endSession();
      return newWithdraw;
    });
    return newWithdraw;
  }

  async pauseResume(id: string) {
    const session = await this.cashierSessionModel.startSession();
    session.startTransaction();
    try {
      const currentSession = await this.cashierSessionModel.findById(id);
      if (!currentSession) {
        throw new NotFoundException('No se pudo actualizar');
      }
      const res = await this.cashierSessionModel.findByIdAndUpdate(
        id,
        { enable: currentSession.enable === true ? false : true },
        {
          new: true,
        },
      );
      await session.commitTransaction();
      session.endSession();
      return res;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(
        `Hubo un error inesperado surante la sesion, mas informacion: ${error}`,
      );
    }
  }
}
