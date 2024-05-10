import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Printer } from '../configuracion/printer.schema';

@Schema({ timestamps: true })
export class Setting {
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Printer' }],
    default: [],
  })
  printers?: Printer[];
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
