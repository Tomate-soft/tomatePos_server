import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Branch {
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
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
