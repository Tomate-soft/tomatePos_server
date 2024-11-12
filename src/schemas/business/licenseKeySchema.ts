import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true, versionKey: false })
export class LicenseKey {
  @Prop({ default: uuidv4() })
  licenseKey: string;

  @Prop({ default: true })
  active: boolean;
}

export const licenseKeySchema = SchemaFactory.createForClass(LicenseKey);
