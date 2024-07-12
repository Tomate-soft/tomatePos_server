import { SchemaFactory, Schema, Prop, MongooseModule } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from '../users.schema';
import { Bills } from '../ventas/bills.schema';
import { CashWithdraw } from './cashWithdraw';
import { ToGoOrder } from '../ventas/orders/toGoOrder.schema';
import { RappiOrder } from '../ventas/orders/rappiOrder.schema';
import { PhoneOrder } from '../ventas/orders/phoneOrder.schema';

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

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'ToGoOrder' }],
    default: [],
  })
  togoorders?: ToGoOrder[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'RappiOrder' }],
    default: [],
  })
  rappiOrders?: RappiOrder[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'PhoneOrder' }],
    default: [],
  })
  phoneOrders?: PhoneOrder[];

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

  @Prop({ trim: true, default: 'active' })
  status?: string;

  @Prop({
    trim: true,
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CashWithdraw' }],
    ref: 'CashWithdraw',
    default: [],
  })
  cashWithdraw?: CashWithdraw[];
}

export const CashierSessionSchema =
  SchemaFactory.createForClass(CashierSession);
