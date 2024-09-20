import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Discount } from './discounts.schema';

@Schema({ timestamps: true })
export class Notes {
  @Prop({
    trim: true,
    required: true,
  })
  checkCode: string;

  @Prop({
    required: true,
    trim: true,
  })
  accountId: string;

  @Prop({
    required: true,
    trim: true,
  })
  noteNumber: number;

  @Prop({
    trim: true,
  })
  noteName?: string;

  @Prop({
    required: true,
    trim: true,
  })
  paymentCode: string;

  @Prop({
    required: true,
    trim: true,
  })
  sellType: string;

  @Prop({
    required: true,
    trim: true,
  })
  user: string;

  @Prop({
    default: [],
    trim: true,
  })
  products: {}[];

  @Prop({
    required: true,
    trim: true,
  })
  checkTotal: string;

  @Prop({
    required: true,
    trim: true,
  })
  status: 'enable' | 'finished' | 'forPayment' | 'cancelled';

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
    type: MongooseSchema.Types.ObjectId,
    ref: 'Discount',
  })
  discount?: Discount;
  @Prop({
    default: 1,
    required: true,
    trim: true,
  })
  diners?: number;
}

export const NoteSchema = SchemaFactory.createForClass(Notes);
