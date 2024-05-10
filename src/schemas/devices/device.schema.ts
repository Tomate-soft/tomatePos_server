import { Schema, SchemaFactory, Prop, MongooseModule } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Setting } from '../setting/setting.schema';

@Schema({ timestamps: true })
export class Device {
  @Prop({
    required: true,
    trim: true,
  })
  deviceIdn: string;
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Setting' }],
    default: [],
  })
  settings?: Setting[];
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
