import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from 'src/dto/ventas/payments/createPaymentDto';
import { UpdatePaymentDto } from 'src/dto/ventas/payments/updatePaymentDto';
import { branchId } from 'src/variablesProvisionales';
import {
  ENABLE_STATUS,
  FINISHED_STATUS,
  FOR_PAYMENT_STATUS,
  FREE_STATUS,
} from 'src/libs/status.libs';
import { ReportsService } from 'src/reports/reports.service';
import { Branch } from 'src/schemas/business/branchSchema';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Table } from 'src/schemas/tables/tableSchema';
import { User } from 'src/schemas/users.schema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';
import { PhoneOrder } from 'src/schemas/ventas/orders/phoneOrder.schema';
import { RappiOrder } from 'src/schemas/ventas/orders/rappiOrder.schema';
import { ToGoOrder } from 'src/schemas/ventas/orders/toGoOrder.schema';
import { Payment } from 'src/schemas/ventas/payment.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Notes.name) private readonly noteModel: Model<Notes>,
    @InjectModel(Bills.name) private readonly billModel: Model<Bills>,
    @InjectModel(Table.name) private readonly tableModel: Model<Table>,
    @InjectModel(Branch.name) private readonly branchModel: Model<Branch>,
    @InjectModel(OperatingPeriod.name)
    private readonly operatingPeriodModel: Model<OperatingPeriod>,
    @InjectModel(RappiOrder.name)
    private readonly rappiOrderModel: Model<RappiOrder>,
    @InjectModel(ToGoOrder.name)
    private readonly toGoOrderModel: Model<ToGoOrder>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(CashierSession.name)
    private readonly cashierSessionModel: Model<CashierSession>,
    private reportsService: ReportsService,
    @InjectModel(PhoneOrder.name)
    private readonly phoneOrderModel: Model<PhoneOrder>,
    private readonly operatingPeriodService: OperatingPeriodService,
  ) {}

  async findAll() {
    return await this.paymentModel
      .find()
      .populate({
        path: 'accountId',
      })
      .lean()
      .populate({
        path: 'noteAccountId',
      })
      .lean()
      .populate({
        path: 'cashier',
      })
      .lean();
  }

  async findOne(id: string) {
    return await this.paymentModel.findById(id);
  }

  async findCurrent() {
    const session = await this.paymentModel.startSession();
    session.startTransaction();
    try {
      const branch = await this.branchModel.findById(branchId);
      if (!branch) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('No se encontro la branch');
      }
      const periodId = branch.operatingPeriod;
      const period = await this.operatingPeriodModel.findById(periodId);
      const payments = await this.paymentModel
        .find({
          operatingPeriod: periodId,
        })
        .populate({
          path: 'accountId',
        })
        .lean()
        .populate({
          path: 'noteAccountId',
        })
        .lean()
        .populate({
          path: 'cashier',
        })
        .lean();
      if (!payments) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('No se encontro el periodo operativo');
      }
      await session.commitTransaction();
      session.endSession();
      return payments;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async create(createdPayment: CreatePaymentDto) {
    const session = await this.paymentModel.startSession();
    session.startTransaction();
    try {
      const lastPaymentCode = await this.paymentModel
        .findOne({})
        .sort({ createdAt: -1 })
        .exec();

      const nextPaymentCode = lastPaymentCode
        ? this.getNextPaymentCode(parseFloat(lastPaymentCode.paymentCode))
        : 1;

      const newCode = nextPaymentCode.toString();
      const formatCode = this.formatCode(newCode);

      const branch = await this.branchModel.findById(branchId);
      if (!branch) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('No se encontro la branch');
      }
      const periodId = branch.operatingPeriod;
      const OperatingPeriod =
        await this.operatingPeriodModel.findById(periodId);

      const newPaymentCode = new this.paymentModel({
        ...createdPayment,
        paymentCode: formatCode,
        operatingPeriod: OperatingPeriod._id,
      });

      if (
        !createdPayment?.transactions?.some(
          (element) => element.paymentType === 'courtesy',
        )
      ) {
        await newPaymentCode.save();
      }
      const billCurrent = await this.billModel
        .findById(createdPayment.accountId)
        .populate({ path: 'payment' });
      const updatedBillData = {
        payment: [...billCurrent.payment, newPaymentCode._id],
        status: FINISHED_STATUS,
      };
      const updatedBill = await this.billModel.findByIdAndUpdate(
        billCurrent._id,
        updatedBillData,
      );
      if (!updatedBill) {
        throw new NotFoundException('No se pudo actualizar la factura');
      }

      // vamos a actualizar la mesa
      const table = await this.tableModel.findById(billCurrent.table);

      const updatedTable = await this.tableModel.findByIdAndUpdate(table._id, {
        status: FREE_STATUS,
        bill: [],
      });
      if (!updatedTable) {
        await session.abortTransaction();
        await session.endSession();
        throw new NotFoundException('No se pudo actualizar la mesa');
      }
      await session.commitTransaction();
      session.endSession();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id: string) {
    return await this.paymentModel.findByIdAndDelete(id);
  }

  async update(id: string, updatePayment: UpdatePaymentDto) {
    return await this.paymentModel.findByIdAndUpdate(id, updatePayment, {
      new: true,
    });
  }

  async paymentNote(
    id: string,
    body: { accountId: string; body: CreatePaymentDto },
  ) {
    const session = await this.paymentModel.startSession();
    session.startTransaction();
    try {
      const lastPaymentCode = await this.paymentModel
        .findOne({})
        .sort({ createdAt: -1 })
        .exec();

      const nextPaymentCode = lastPaymentCode
        ? this.getNextPaymentCode(parseFloat(lastPaymentCode.paymentCode))
        : 1;

      const newCode = nextPaymentCode.toString();
      const formatCode = this.formatCode(newCode);

      const branch = await this.branchModel.findById(branchId);
      if (!branch) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('No se encontro la branch');
      }
      const periodId = branch.operatingPeriod;
      const OperatingPeriod =
        await this.operatingPeriodModel.findById(periodId);

      const newPayment = new this.paymentModel({
        ...body.body,
        paymentCode: formatCode,
        operatingPeriod: OperatingPeriod._id,
      });

      if (!newPayment) {
        throw new NotFoundException(`No se pudo crear el pago`);
      }
      if (parseFloat(newPayment.paymentTotal) > 0) {
        await newPayment.save();
      }

      const dataInjectInNote = {
        status: FINISHED_STATUS,
        paymentCode:
          parseFloat(newPayment.paymentTotal) > 0 ? newPayment._id : 'NP',
      };
      await this.noteModel.findByIdAndUpdate(id, dataInjectInNote);
      const currentBill = await this.billModel
        .findById(body.accountId)
        .populate({ path: 'notes' })
        .populate({ path: 'payment' });

      const enableNotes = currentBill.notes.filter(
        (note) =>
          note.status === ENABLE_STATUS || note.status === FOR_PAYMENT_STATUS,
      );
      if (enableNotes.length <= 0) {
        const tableUpdated = await this.tableModel.findByIdAndUpdate(
          currentBill.table,
          { status: FREE_STATUS, bill: [] },
        );

        const updatedBillData = {
          payment: [...(currentBill.payment ?? []), newPayment._id],
          status: FINISHED_STATUS,
        };
        await this.billModel.findByIdAndUpdate(
          currentBill._id,
          updatedBillData,
        );
        await session.commitTransaction();
        session.endSession();
      }

      const updatedBillData = {
        payment: [...(currentBill.payment ?? []), newPayment._id],
      };
      await this.billModel.findByIdAndUpdate(currentBill._id, updatedBillData);
      await session.commitTransaction();
      session.endSession();
      return newPayment;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error);
    }
  }

  async paymentToGo(data: { waiterId: string; body: any }) {
    const session = await this.paymentModel.startSession();
    session.startTransaction();
    try {
      const lastPaymentCode = await this.paymentModel
        .findOne({})
        .sort({ createdAt: -1 })
        .exec();

      const nextPaymentCode = lastPaymentCode
        ? this.getNextPaymentCode(parseFloat(lastPaymentCode.paymentCode))
        : 1;

      const newCode = nextPaymentCode.toString();
      const formatCode = this.formatCode(newCode);

      const branch = await this.branchModel.findById(branchId);
      if (!branch) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('No se encontro la branch');
      }
      const periodId = branch.operatingPeriod;
      const OperatingPeriod =
        await this.operatingPeriodModel.findById(periodId);

      // aca debemos pasar el body para crear el pago
      const newPayment = new this.paymentModel({
        ...data.body,
        paymentCode: formatCode,
        operatingPeriod: OperatingPeriod._id,
      });
      await newPayment.save();

      // la togo order es encontrada aca
      const currentBill = await this.toGoOrderModel.findById(
        data.body.accountId,
      );
      // la data que vamos a cambiar de la orden
      const updatedToGoOrder = {
        payment: [newPayment._id],
        status: FINISHED_STATUS,
      };

      const toGoOrderUpdated = await this.toGoOrderModel.findByIdAndUpdate(
        currentBill._id,
        updatedToGoOrder,
      );
      const waiter = await this.userModel.findById(data.waiterId);
      const totalTransactions = newPayment.transactions;
      // añadiremos las propinas al mesero
      const totalTips =
        waiter.tips.length > 0
          ? waiter.tips.concat(totalTransactions)
          : totalTransactions;
      const updatedWaiter = {
        toGoOrder: [...waiter.togoorders, toGoOrderUpdated._id],
        tips: totalTips,
      };
      await this.userModel.findByIdAndUpdate(data.waiterId, updatedWaiter);

      // falta el cashierSession actualizado
      const cashier = await this.userModel.findById(data.body.cashier);
      const sessionCashier = await this.cashierSessionModel.findById(
        cashier.cashierSession,
      );
      const updatedCashierSession = {
        togoorders: [...sessionCashier.togoorders, currentBill._id],
      };

      const cashierSessionUpdated =
        await this.cashierSessionModel.findByIdAndUpdate(
          sessionCashier._id,
          updatedCashierSession,
        );

      await session.commitTransaction();
      session.endSession();

      return { message: 'Funciona perfecto' };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  async paymentPhoneOrder(data: { waiterId: string; body: any }) {
    const session = await this.paymentModel.startSession();
    session.startTransaction();
    try {
      const lastPaymentCode = await this.paymentModel
        .findOne({})
        .sort({ createdAt: -1 })
        .exec();

      const nextPaymentCode = lastPaymentCode
        ? this.getNextPaymentCode(parseFloat(lastPaymentCode.paymentCode))
        : 1;

      const newCode = nextPaymentCode.toString();
      const formatCode = this.formatCode(newCode);

      const branch = await this.branchModel.findById(branchId);
      if (!branch) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('No se encontro la branch');
      }
      const periodId = branch.operatingPeriod;
      const OperatingPeriod =
        await this.operatingPeriodModel.findById(periodId);

      // aca debemos pasar el body para crear el pago
      const newPayment = new this.paymentModel({
        ...data.body,
        paymentCode: formatCode,
        operatingPeriod: OperatingPeriod._id,
      });
      await newPayment.save();

      // la togo order
      const currentBill = await this.phoneOrderModel.findById(
        data.body.accountId,
      );

      const updatedPhoneOrder = {
        payment: [newPayment._id],
        status: FINISHED_STATUS,
      };

      const phoneOrderUpdated = await this.phoneOrderModel.findByIdAndUpdate(
        currentBill._id,
        updatedPhoneOrder,
      );

      const waiter = await this.userModel.findById(data.waiterId);
      const totalTransactions = newPayment.transactions;

      // añadiremos las propinas al mesero
      const totalTips =
        waiter.tips.length > 0
          ? waiter.tips.concat(totalTransactions)
          : totalTransactions;
      const updatedWaiter = {
        phoneOrders: [...waiter.phoneOrders, phoneOrderUpdated._id],
        tips: totalTips,
      };

      await this.userModel.findByIdAndUpdate(data.waiterId, updatedWaiter);

      // falta el cashierSession actualizado
      const cashier = await this.userModel.findById(data.body.cashier);
      const sessionCashier = await this.cashierSessionModel.findById(
        cashier.cashierSession,
      );
      const updatedCashierSession = {
        phoneOrders: [...sessionCashier.phoneOrders, currentBill._id],
      };

      const cashierSessionUpdated =
        await this.cashierSessionModel.findByIdAndUpdate(
          sessionCashier._id,
          updatedCashierSession,
        );

      await session.commitTransaction();
      session.endSession();
      return { message: 'Funciona perfecto' };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
    }
  }
  async paymentRappiService(data: { waiterId: string; body: any }) {
    const session = await this.paymentModel.startSession();
    session.startTransaction();
    try {
      const lastPaymentCode = await this.paymentModel
        .findOne({})
        .sort({ createdAt: -1 })
        .exec();

      const nextPaymentCode = lastPaymentCode
        ? this.getNextPaymentCode(parseFloat(lastPaymentCode.paymentCode))
        : 1;

      const newCode = nextPaymentCode.toString();
      const formatCode = this.formatCode(newCode);

      const branch = await this.branchModel.findById(branchId);
      if (!branch) {
        await session.abortTransaction();
        session.endSession();
        throw new NotFoundException('No se encontro la branch');
      }
      const periodId = branch.operatingPeriod;
      const OperatingPeriod =
        await this.operatingPeriodModel.findById(periodId);

      // aca debemos pasar el body para crear el pago
      const newPayment = new this.paymentModel({
        ...data.body,
        paymentCode: formatCode,
        operatingPeriod: OperatingPeriod._id,
      });
      // se crea el pago
      await newPayment.save();

      // encontramos la orden actual - la que enviamos
      const currentBill = await this.rappiOrderModel.findById(
        data.body.accountId,
      );

      const updatedRappiOrder = {
        payment: [...currentBill.payment, newPayment._id],
        status: FINISHED_STATUS,
      };

      const rappiOrderUpdated = await this.rappiOrderModel.findByIdAndUpdate(
        currentBill._id,
        updatedRappiOrder,
      );

      const waiter = await this.userModel.findById(data.waiterId);
      const totalTransactions = newPayment.transactions;

      const totalTips =
        waiter.tips.length > 0
          ? waiter.tips.concat(totalTransactions)
          : totalTransactions;
      const updatedWaiter = {
        rappiOrders: [...waiter.rappiOrders, rappiOrderUpdated._id],
        tips: totalTips,
      };

      await this.userModel.findByIdAndUpdate(data.waiterId, updatedWaiter);

      // falta el cashierSession actualizado
      const cashier = await this.userModel.findById(data.body.cashier);
      const sessionCashier = await this.cashierSessionModel.findById(
        cashier.cashierSession,
      );
      const updatedCashierSession = {
        rappiOrders: [...sessionCashier.rappiOrders, currentBill._id],
      };

      const cashierSessionUpdated =
        await this.cashierSessionModel.findByIdAndUpdate(
          sessionCashier._id,
          updatedCashierSession,
        );

      await session.commitTransaction();
      session.endSession();
      console.log('se compelto bien');
      return { message: 'Funciona perfecto' };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
    }
  }

  ///////////////////////////////////////////////////////////////
  async paymentTips(id: string, body: any) {
    const session = await this.paymentModel.startSession();
    session.startTransaction();
    try {
      await session.commitTransaction();
      session.endSession();
      console.log('Por aca si llega al paymentTips de payments.service');
      await this.reportsService.payTipsReport(body);
      return { message: 'Funciona perfecto' };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error);
    }
  }

  async getCurrentPayments() {
    const session = await this.paymentModel.startSession();
    session.startTransaction();
    try {
      const currentPeriod = await this.operatingPeriodService.getCurrent();
      const currentPeriodId = currentPeriod[0]._id.toString();

      const currentPayments = await this.paymentModel
        .find({
          operatingPeriod: currentPeriodId,
        })
        .populate({
          path: 'accountId',
        })
        .lean()
        .populate({
          path: 'noteAccountId',
        })
        .lean()
        .populate({
          path: 'cashier',
        })
        .lean();
      if (!currentPayments) {
        throw new NotFoundException('No se encontro el periodo operativo');
      }
      await session.commitTransaction();
      session.endSession();
      return currentPayments;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
  private getNextPaymentCode(lastPaymentCode: number): number {
    // Incrementar el billCode actual en 1
    return lastPaymentCode + 1;
  }

  private formatCode(code: string): string {
    return code.padStart(6, '0');
  }
}
