import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { DailyRegister } from '../dailyRegister/createDailyRegister';
import { Schema as MongooseSchema } from 'mongoose';
import { CashierSession } from '../cashierSession/cashierSession';

interface CashIn {
  init: boolean;
  amount: string;
}

@Schema({ timestamps: true })
export class OperatingPeriod {
  @Prop({ default: true })
  status: boolean;

  @Prop({
    default: [],
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'DailyRegister' }],
  })
  dailyRegisters: DailyRegister[];

  @Prop({
    default: [],
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CashierSession' }],
  })
  sellProcess: CashierSession[];

  @Prop({ required: true, default: '0.00' })
  withdrawals?: string;

  @Prop({
    type: {
      init: { type: Boolean, default: false },
      amount: { type: String, default: '$0.00' },
    },
    default: { init: false, amount: '$0.00' },
  })
  cashIn?: CashIn;
}

export const OperatingPeriodSchema =
  SchemaFactory.createForClass(OperatingPeriod);
