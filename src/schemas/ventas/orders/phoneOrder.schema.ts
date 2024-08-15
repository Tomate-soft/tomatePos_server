import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Payment } from '../payment.schema';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';

@Schema({ timestamps: true, versionKey: false })
export class PhoneOrder {
  @Prop({ required: true, trim: true })
  code: string;

  @Prop({
    required: true,
    trim: true,
  })
  user: string;

  @Prop({
    required: true,
    trim: true,
  })
  userId: string;

  @Prop({
    required: true,
    trim: true,
  })
  checkTotal: string;

  @Prop({
    required: true,
    default: 'enable',
  })
  status: 'enable' | 'forPayment' | 'pending' | 'cancel' | 'finished';

  @Prop({
    default: [],
    trim: true,
  })
  products: [];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Payment' }],
    default: [],
  })
  payment?: Payment[];

  @Prop({ default: 'PHONE_ORDER' })
  sellType: string;

  @Prop({
    trim: true,
  })
  orderName?: string;

  // meterem,os el operatingPeriod
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'OperatingPeriod',
  })
  operatingPeriod: OperatingPeriod;
}

export const PhoneOrderSchema = SchemaFactory.createForClass(PhoneOrder);
