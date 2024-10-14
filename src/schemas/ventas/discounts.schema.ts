import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Bills } from './bills.schema';
import { RappiOrder } from './orders/rappiOrder.schema';
import { PhoneOrder } from './orders/phoneOrder.schema';
import { ToGoOrder } from './orders/toGoOrder.schema';
import { User } from '../users.schema';
import { Notes } from './notes.schema';

@Schema({ timestamps: true })
export class Discount {
  @Prop({
    trim: true,
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Bills',
  })
  accountId?: Bills;

  @Prop({
    trim: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Notes',
  })
  noteAccountId?: Notes;

  @Prop({
    trim: true,
  })
  productName?: string;

  @Prop({
    trim: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'RappiOrder',
  })
  rappiAccountId?: RappiOrder;

  @Prop({
    trim: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'PhoneOrder',
  })
  phoneAccountId?: PhoneOrder;

  @Prop({
    trim: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'ToGoOrder',
  })
  toGoAccountId?: ToGoOrder;

  /*
  @Prop({
    trim: true,
  })
  noteId?: string;
  */

  @Prop({ trim: true })
  discountType: string;

  @Prop({
    trim: true,
    required: true,
  })
  discountMount: string;

  @Prop({ trim: true, required: true })
  setting: string;

  @Prop({
    required: true,
    trim: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  discountByUser: User;

  @Prop({
    required: true,
    trim: true,
  })
  discountFor: string;

  @Prop({
    required: true,
    trim: true,
  })
  discountReason: string;

  @Prop({
    default: 'no-identified',
  })
  operatingPeriod?: string;

  @Prop({})
  totalDiscountQuantity?: string;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
