import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

export interface Transaction {
  paymentType: string;
  quantity: string;
}

@Schema({ timestamps: true })
export class Payment {
  @Prop({
    required: true,
    trim: true,
  })
  accountId: string;

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  paymentCode?: string;

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
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
