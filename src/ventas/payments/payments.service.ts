import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateBillDto } from 'src/dto/ventas/bills/updateBill.Dto';
import { CreatePaymentDto } from 'src/dto/ventas/payments/createPaymentDto';
import { UpdatePaymentDto } from 'src/dto/ventas/payments/updatePaymentDto';
import {
  ENABLE_STATUS,
  FINISHED_STATUS,
  FOR_PAYMENT_STATUS,
  FREE_STATUS,
} from 'src/libs/status.libs';
import { Table } from 'src/schemas/tables/tableSchema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';
import { Payment } from 'src/schemas/ventas/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Notes.name) private readonly noteModel: Model<Notes>,
    @InjectModel(Bills.name) private readonly billModel: Model<Bills>,
    @InjectModel(Table.name) private readonly tableModel: Model<Table>,
  ) {}

  async findAll() {
    return await this.paymentModel.find();
  }

  async findOne(id: string) {
    return await this.paymentModel.findById(id);
  }

  async create(createdPayment: CreatePaymentDto) {
    console.log(
      'Por aca el createdPayment si llega al create de payments.service',
    );
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

      const newPaymentCode = new this.paymentModel({
        ...createdPayment,
        paymentCode: newCode,
      });
      await newPaymentCode.save();
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
      const newPayment = new this.paymentModel(body.body);
      await newPayment.save();
      if (!newPayment) {
        throw new NotFoundException(`No se pudo crear el pago`);
      }

      const dataInjectInNote = {
        status: FINISHED_STATUS,
        paymentCode: newPayment._id,
      };
      await this.noteModel.findByIdAndUpdate(id, dataInjectInNote); // cambiamos la nota
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
          payment:
            currentBill.payment.length > 0
              ? [...currentBill.payment, newPayment._id]
              : [newPayment._id],
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
        payment:
          currentBill.payment.length > 0
            ? [...currentBill.payment, newPayment._id]
            : [newPayment._id],
        status: FINISHED_STATUS,
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

  private getNextPaymentCode(lastPaymentCode: number): number {
    // Incrementar el billCode actual en 1
    return lastPaymentCode + 1;
  }
}
