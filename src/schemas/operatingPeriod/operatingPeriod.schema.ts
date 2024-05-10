import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { DailyRegister } from '../dailyRegister/createDailyRegister';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CashierSession } from '../cashierSession/cashierSession';

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

  /*
  @Prop({ required: true })
  totalRevenue: string;
  */
}

export const OperatingPeriodSchema =
  SchemaFactory.createForClass(OperatingPeriod);
