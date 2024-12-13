import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

import { Setting } from '../setting/setting.schema';

@Schema({ timestamps: true })
export class Device {
  @Prop({
    required: true,
    trim: true,
  })
  deviceName: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Setting',
  })
  settings?: Setting;

  @Prop({
    default: true,
  })
  status?: boolean;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
