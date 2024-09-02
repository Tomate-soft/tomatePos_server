import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { OperatingPeriod } from '../operatingPeriod/operatingPeriod.schema';
import { Bills } from './bills.schema';

export interface Transaction {
  paymentType: string;
  quantity: string;
  payQuantity: string;
  tips: string;
}

@Schema({ timestamps: true })
export class Payment {
  @Prop({
    required: true,
    trim: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Bills',
  })
  accountId: Bills;

  @Prop({
    /* unique: true, */
    trim: true,
  })
  paymentCode: string;

  @Prop({
    required: true,
    trim: true,
  })
  check: string;

  @Prop({
    trim: true,
    default: '',
  })
  noteCode?: string;

  @Prop({
    required: true,
    trim: true,
  })
  checkTotal: string;

  @Prop({
    required: true,
    trim: true,
  })
  tips: string;

  @Prop({ default: [] })
  transactions: Transaction[];

  @Prop({
    required: true,
    trim: true,
    default: '0.00',
  })
  paymentTotal: string;

  @Prop({
    required: true,
    trim: true,
  })
  cashier: string;

  @Prop({
    required: true,
    trim: true,
  })
  paymentDate: string;

  @Prop({
    required: true,
    trim: true,
    default: false,
  })
  billing: boolean;

  @Prop({
    required: true,
    trim: true,
  })
  difference: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'OperatingPeriod',
  })
  operatingPeriod: OperatingPeriod;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
