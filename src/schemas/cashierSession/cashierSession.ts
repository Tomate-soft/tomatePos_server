import { SchemaFactory, Schema, Prop, MongooseModule } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from '../users.schema';
import { Bills } from '../ventas/bills.schema';

@Schema({ timestamps: true })
export class CashierSession {
  @Prop({ trim: true })
  startDate: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  user: User;
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Bills' }],
    default: [],
  })
  bills: Bills[];

  @Prop({ trim: true })
  endDate: string;

  @Prop({ trim: true, default: true })
  enable?: boolean;

  @Prop({ required: true })
  initialQuantity: string;

  @Prop({ trim: true, default: '0.00' })
  totalDebit?: string;

  @Prop({ trim: true, default: '0.00' })
  totalCredit?: string;

  @Prop({ trim: true, default: '0.00' })
  totalCash?: string;
}

export const CashierSessionSchema =
  SchemaFactory.createForClass(CashierSession);
