import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Payment } from '../payment.schema';

@Schema({ timestamps: true, versionKey: false })
export class ToGoOrder {
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
  checkTotal: string;

  @Prop({
    required: true,
    default: 'enable',
  })
  status: 'enable' | 'forPayment' | 'pending' | 'cancel';

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
}

export const ToGoOrderSchema = SchemaFactory.createForClass(ToGoOrder);
