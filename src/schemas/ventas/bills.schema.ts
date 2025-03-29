import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Payment } from './payment.schema';
import { Notes } from './notes.schema';
import { CashierSession } from '../cashierSession/cashierSession';
import { Table } from '../tables/tableSchema';
import { Discount } from './discounts.schema';
import { OperatingPeriod } from '../operatingPeriod/operatingPeriod.schema';
import { User } from '../users.schema';

@Schema({ timestamps: true })
export class Bills {
  @Prop({
    required: true,
    trim: true,
  })
  code: string;

  @Prop({
    trim: true,
    default: 'ON_SITE_ORDER',
  })
  sellType: string;

  @Prop({
    required: true,
    trim: true,
  })
  user: string;

  @Prop({
    required: true,
    trim: true,
  })
  userCode: string;

  @Prop({
    required: true,
    trim: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;

  @Prop({
    required: true,
    trim: true,
  })
  checkTotal: string;

  @Prop({
    required: true,
    default: 'enable',
  })
  status: 'enable' | 'disable' | 'cancelled' | 'finished';

  @Prop({
    default: [],
  })
  products?: object[];

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
    default: null,
  })
  billName?: string | null;

  @Prop({
    trim: true,
    default: null,
  })
  comments?: string | null;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Notes' }],
    default: [],
  })
  notes?: Notes[];

  @Prop({
    default: [],
  })
  transferHistory?: string[]; // historial de transferenncias // aca seguirmos

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'CashierSession',
    default: null,
  })
  cashierSession?: CashierSession | null;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Discount', default: null })
  discount?: Discount | null;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'OperatingPeriod' })
  operatingPeriod?: OperatingPeriod;

  @Prop({
    default: 1,
    required: true,
    trim: true,
  })
  diners?: number;

  /* 
  device: string;
  */
}

export interface BillsDocument extends Document, Bills {}

export const BillSchema = SchemaFactory.createForClass(Bills);
