import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Bills } from './bills.schema';
import { Notes } from './notes.schema';
import { Product } from './product.schema';

@Schema({ timestamps: true })
export class Cancellations {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Bills',
  })
  accountId: Bills;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Notes' })
  noteId?: Notes;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  product?: any;

  @Prop({
    required: true,
    trim: true,
  })
  cancellationBy: string;

  @Prop({
    required: true,
    trim: true,
  })
  cancellationFor: string;

  @Prop({
    required: true,
    trim: true,
  })
  cancellationReason: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ trim: true, default: 'no-identified' })
  operatingPeriod?: string;

  @Prop({ required: true, type: Number })
  cancelledAmount: number;
}

export const CancellationSchema = SchemaFactory.createForClass(Cancellations);
