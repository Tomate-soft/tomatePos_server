import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Payment } from '../payment.schema';

@Schema({ timestamps: true, versionKey: false })
export class RappiOrder {
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
  products: {}[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Payment' }],
    default: [],
  })
  payment?: Payment[];

  @Prop({ default: 'RAPPI_ORDER' })
  sellType: string;

  @Prop({
    trim: true,
  })
  orderName?: string;
}

export const RappiOrderSchema = SchemaFactory.createForClass(RappiOrder);
