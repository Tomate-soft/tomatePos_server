import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Discount {
  @Prop({
    trim: true,
    required: true,
  })
  accountId: string;

  /*
  @Prop({
    trim: true,
  })
  noteId?: string;
  */

  @Prop({ trim: true })
  discountType: string;

  @Prop({
    trim: true,
    required: true,
  })
  discountMount: string;

  @Prop({ trim: true, required: true })
  setting: string;

  @Prop({
    required: true,
    trim: true,
  })
  discountByUser: string;

  @Prop({
    required: true,
    trim: true,
  })
  discountFor: string;

  @Prop({
    required: true,
    trim: true,
  })
  discountReason: string;

  @Prop({
    default: 'no-identified',
  })
  operatingPeriod?: string;

  @Prop({})
  totalDiscountQuantity?: string;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
