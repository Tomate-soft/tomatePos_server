import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Payment } from './payment.schema';
import { Notes } from './notes.schema';
import { CashierSession } from '../cashierSession/cashierSession';
import { Table } from '../tables/tableSchema';
import { Discount } from './discounts.schema';

@Schema({ timestamps: true })
export class Bills {
  @Prop({
    required: true,
    trim: true,
  })
  billCode: number;

  @Prop({
    required: true,
    trim: true,
  })
  sellType: 'onSite' | 'toGo' | 'rappi' | 'phone' | 'n/A';

  @Prop({
    required: true,
    trim: true,
  })
  user: string;

  @Prop({
    required: true,
    trim: true,
  })
  checkTotal: string;

  @Prop({
    required: true,
  })
  status: 'enable' | 'disabled' | 'cancelled' | 'finished';

  @Prop({
    default: [],
    trim: true,
  })
  products: {}[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Payment' }],
    default: [],
  })
  payment?: Payment[];

  @Prop({
    required: true,
    trim: true,
  })
  tableNum: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Table',
  })
  table: Table;

  @Prop({
    trim: true,
  })
  billName: string;

  @Prop({
    trim: true,
    default: '',
  })
  comments: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Notes' }],
    default: [],
  })
  notes?: Notes[];

  @Prop({
    default: [],
  })
  transferHistory?: string[]; // historial de transferenncias // aca seguirmos

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'CashierSession' })
  cashierSession?: CashierSession;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Discount' })
  discount?: Discount;

  /* 
  device: string;
  */
}

export interface BillsDocument extends Document, Bills {}

export const BillSchema = SchemaFactory.createForClass(Bills);
