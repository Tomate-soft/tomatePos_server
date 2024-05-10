import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateBillDto } from 'src/dto/ventas/bills/updateBill.Dto';
import { CreatePaymentDto } from 'src/dto/ventas/payments/createPaymentDto';
import { UpdatePaymentDto } from 'src/dto/ventas/payments/updatePaymentDto';
import { FINISHED_STATUS } from 'src/libs/status.libs';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';
import { Payment } from 'src/schemas/ventas/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Notes.name) private readonly noteModel: Model<Notes>,
    @InjectModel(Bills.name) private readonly billModel: Model<Bills>,
  ) {}

  async findAll() {
    return await this.paymentModel.find();
  }

  async findOne(id: string) {
    return await this.paymentModel.findById(id);
  }

  async create(createdPayment: CreatePaymentDto) {
    try {
      // Obtenemos el ultimo pago insertado
      const lastPaymentCode = await this.paymentModel
        .findOne({})
        .sort({ createdAt: -1 })
        .exec();

      const nextPaymentCode = lastPaymentCode
        ? this.getNextPaymentCode(parseFloat(lastPaymentCode.paymentCode))
        : 1;

      const newCode = nextPaymentCode.toString();

      // Crear nueva solicitud de pago con el folio calculado
      const newPaymentCode = new this.paymentModel({
        ...createdPayment,
        paymentCode: newCode,
      });
      console.log(createdPayment.paymentCode);

      return await newPaymentCode.save();
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
    console.log('LOGS DEL SERVICIO:');
    console.log(id);
    console.log(body);
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
      await this.noteModel.findByIdAndUpdate(id, dataInjectInNote);

      const currentBill = await this.billModel.findById(body.accountId);
      const newTotal = (
        parseFloat(currentBill.checkTotal) - parseFloat(newPayment.paymentTotal)
      ).toString();

      const updatedBillData = {
        payment: [...currentBill.payment, newPayment._id],
        checkTotal: newTotal,
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
