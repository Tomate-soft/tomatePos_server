import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branchSchema';
import { LicenseKey } from './licenseKeySchema';

@Schema({ timestamps: true })
export class Business {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  postalCode: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  logo: string;

  @Prop({
    default: [],
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Branch' }],
  })
  branches?: Branch[];

  @Prop({
    type: { type: MongooseSchema.Types.ObjectId, ref: 'LicenseKey' },
  })
  licenseKey: LicenseKey;

  @Prop({ default: false })
  status: boolean;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
