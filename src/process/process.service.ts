import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CANCELLED_STATUS } from 'src/libs/status.libs';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { BillsService } from 'src/ventas/bills/bills.service';

@Injectable()
export class ProcessService {
  constructor(
    @InjectModel(Bills.name) private billsModel: Model<Bills>,
    @InjectModel(OperatingPeriod.name)
    private operatingModel: Model<OperatingPeriod>,
    @Inject(forwardRef(() => OperatingPeriodService))
    private readonly operatingPeriodService: OperatingPeriodService,
    @Inject(forwardRef(() => BillsService))
    private readonly billsService: BillsService,
  ) {}

  totalCurrentSells = async () => {
    const session = await this.operatingModel.startSession();
    session.startTransaction();
    try {
      const allOrders = await this.billsService.findCurrent();
      console.log('allOrders', allOrders);
      const filterOrders = allOrders.filter(
        (order) => order.status != CANCELLED_STATUS,
      );
      const sellTotal =
        filterOrders?.reduce((acc, order) => {
          return acc + parseFloat(order.checkTotal);
        }, 0) ?? 0.0;

      await session.commitTransaction();
      session.endSession();
      return sellTotal ?? 0.0;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };

  totalPeriodSells = async (id: string) => {
    const session = await this.operatingModel.startSession();
    session.startTransaction();
    try {
      const allOrders = await this.billsService.findCurrent(id);
      const filterOrders = allOrders.filter(
        (order) => order.status != CANCELLED_STATUS,
      );
      const sellTotal =
        filterOrders?.reduce((acc, order) => {
          return acc + parseFloat(order.checkTotal);
        }, 0) ?? 0.0;
      await session.commitTransaction();
      session.endSession();
      const counterSells = allOrders.length ?? 0;

      return { totalSellCount: counterSells, totalSellAmount: sellTotal };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };

  ///////////////////////////////////////////////
  // totales  para solo el tipo de restaurante.//
  ///////////////////////////////////////////////
  especifTotalPeriodSells = async (id: string, type: string) => {
    const session = await this.operatingModel.startSession();
    session.startTransaction();
    try {
      const resOrders = await this.billsService.findCurrent(id);
      const allOrders = resOrders.filter((order) => order.sellType === type);
      const filterOrders = resOrders.filter(
        (order) => order.status != CANCELLED_STATUS,
      );
      const sellTotal =
        filterOrders?.reduce((acc, order) => {
          return acc + parseFloat(order.checkTotal);
        }, 0) ?? 0.0;
      await session.commitTransaction();
      session.endSession();
      const counterSells = allOrders.length ?? 0;

      return { totalSellCount: counterSells, totalSellAmount: sellTotal };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };

  especificSellsForPayment = async (id: string, type?: string) => {
    const session = await this.operatingModel.startSession();
    session.startTransaction();
    try {
      const resOrders = await this.billsService.findCurrent(id);
      const allOrders = resOrders.filter((order) => order.payment.length > 0);
      const allTransactions = allOrders.flatMap((order) =>
        order.payment.flatMap((payment) => payment.transactions),
      );
      const filterTransactions = allTransactions.filter((transaction) =>
        type
          ? transaction.paymentType === type
          : ['cash', 'credit', 'debit', 'transfer'].includes(
              transaction.paymentType,
            ),
      );
      return {
        numberOfTransactions: filterTransactions.length,
        totalAmount: filterTransactions
          .reduce(
            (acc, transaction) => acc + parseFloat(transaction.payQuantity),
            0,
          )
          .toFixed(2)
          .toString(),
        transactionArray: filterTransactions,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new NotFoundException('Se encontro un error al obtener el total');
    }
  };

  // analizaremos bien este metodo debemos de sacar en formatro completo todas las cuentas
  getTotalCurrentBills = async () => {
    const session = await this.operatingModel.startSession();
    session.startTransaction();
    try {
      const currentPeriod = await this.operatingPeriodService.getCurrent();
      const cashierSessions = currentPeriod[0].sellProcess;
      const allOrders = cashierSessions.reduce((acc, session) => {
        return acc.concat(
          session.bills,
          session.phoneOrders,
          session.rappiOrders,
          session.togoorders,
        );
      }, []);

      await session.commitTransaction();
      session.endSession();
      return allOrders;
    } catch (error) {}
  };

  getCurrentIncome = async () => {
    const session = await this.operatingModel.startSession();
    session.startTransaction();
    try {
      const currentPeriod = await this.operatingPeriodService.getCurrent();
      const totalCurrentSells = await this.totalCurrentSells();
      const incomeTotal = currentPeriod[0].cashIn
        ? parseFloat(currentPeriod[0].cashIn.amount) + totalCurrentSells
        : totalCurrentSells;
      console.log(parseFloat(currentPeriod[0].cashIn.amount));

      if (currentPeriod[0].cashIn.init) {
        console.log(parseFloat(currentPeriod[0].cashIn.amount));
      }

      await session.commitTransaction();
      session.endSession();
      return incomeTotal;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error('Ha ocurrido un error al obtener el total de ingresos');
    }
  };
}

/*
  // vamos a traernos todas las cuentas activas
  getAllActiveBills = async () => {
    const session = await this.operatingModel.startSession();
    session.startTransaction();
    try {
      const currentPeriod = await this.operatingPeriodService.getCurrent();
      await session.commitTransaction();
      session.endSession();
      return allOrders;
    } catch (error) {}
  };

  */
