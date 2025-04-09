import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class RewritedPeriod extends Document {
  @Prop()
  periodDate: string;

  @Prop()
  accounts: Mixed[];
}

export const RewritedPeriodSchema =
  SchemaFactory.createForClass(RewritedPeriod);
