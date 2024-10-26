import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

    if (newSession._id) {
      try {
        const updatedUser = await this.userModel.findByIdAndUpdate(
          body.user,
          { cashierSession: newSession._id },
          { new: true },
        );
      } catch (error) {
        throw new NotFoundException(
          'No se completo la actualizacion de usuario',
        );
      }
    }
    // Se retorna la nueva sesión creada
    return newSession;
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
      if (!currentSession) {
        throw new NotFoundException('No se pudo actualizar');
      }
      const res = await this.cashierSessionModel.findByIdAndUpdate(
        id,
        { bills: [...currentSession.bills].concat(body.bills) },
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

  async cashWithdrawal(body: any) {
    const session = await this.cashWithdrawModel.startSession();
    session.startTransaction();
    // nec4sitamos saber si el monto que se esta retirando es menor al monto que se tiene en caja
    const currentOperatingPeriod =
      await this.operatingPeriodService.getCurrent();
    // una ves creado el retiro vamos meterlo a la session del cajero
    const currentUser = await this.userModel.findById(body.user);
    if (!currentUser) {
      throw new NotFoundException('No se encontro el usuario');
    }
    const currentSession = await this.cashierSessionModel
      .findById(currentUser.cashierSession)
      .populate({ path: 'cashWithdraw' });
    const finishedBills = currentSession.bills.filter(
      (bill) => bill.status === 'finished',
    );
    const totalpayments = finishedBills.flatMap((bill) => bill.payment);
    const transactionsArray = totalpayments.flatMap(
      (payment) => payment.transactions,
    );
    const cashTransactions = transactionsArray.filter(
      (transaction) => transaction.paymentType === 'cash',
    );
    const cashTotal = cashTransactions.reduce(
      (acc, transaction) => acc + parseFloat(transaction.payQuantity),
      0,
    );
    const withdrawalsTotal =
      currentSession.cashWithdraw
        .reduce((acc, withdraw) => acc + parseFloat(withdraw.amount), 0)
        .toFixed(2)
        .toString() ?? '0.00';
    const cashAvailable =
      cashTotal +
      parseFloat(currentSession.initialQuantity) -
      parseFloat(withdrawalsTotal);
    const isAllowed = parseFloat(body.amount) <= cashAvailable;

    if (isAllowed) {
      try {
        const newWithdraw = new this.cashWithdrawModel(body);
        await newWithdraw.save();

        const updateSession = await this.cashierSessionModel.findByIdAndUpdate(
          currentUser.cashierSession,
          { cashWithdraw: [...currentSession.cashWithdraw, newWithdraw._id] },
          { new: true },
        );

        console.log('currentOperatingPeriod', currentOperatingPeriod);

        // tenemos aqui el periodo operativo /vamos a calcular el total de retiros parciales
        const totalPartialWithdrawals = (
          parseFloat(currentOperatingPeriod[0].withdrawals) +
          parseFloat(body.amount)
        )
          .toFixed(2)
          .toString();

        // vamos a actualizar el periodo operativo con el nuevo total de retiros
        const updatedOperatingPeriod =
          await this.operatingPeriodModel.findByIdAndUpdate(
            currentOperatingPeriod[0]._id,
            { withdrawals: totalPartialWithdrawals },
            { new: true },
          );

        await session.commitTransaction();
        session.endSession();
        return updatedOperatingPeriod;
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(
          `Hubo un error inesperado durante la sesion, mas informacion: ${error}`,
        );
      }
    }
    await session.abortTransaction();
    session.endSession();
    console.error(
      'No hay efectivo suficiente para realizar el retiro, por favor verifique el monto a retirar',
    );
    return { message: 'No hay efectivo suficiente para realizar el retiro' };
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
