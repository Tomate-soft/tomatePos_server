import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class LicenseKey {
  @Prop({ default: uuidv4() })
  licenseKey: string;

  @Prop()
  address: string;
}

export const licenseKeySchema = SchemaFactory.createForClass(LicenseKey);
