import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed } from 'mongoose';
import { OperationalClousure } from '../operatingPeriod/operationalClousure';

@Schema({ timestamps: true, versionKey: false })
export class SourcePeriod extends Document {
  @Prop()
  periodDate: string;

  @Prop()
  branchId: string;

  @Prop()
  accounts: Mixed[];
  // Aquí solo referenciamos la clase
  @Prop({ type: OperationalClousure })
  operationalClousure?: OperationalClousure;
}

export const SourcePeriodSchema = SchemaFactory.createForClass(SourcePeriod);
