import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({
    required: true,
    trim: true,
  })
  productName: string;

  @Prop({
    required: true,
    trim: true,
  })
  quantity: number;

  @Prop({
    required: true,
    trim: true,
  })
  category: string;

  @Prop({
    required: true,
    trim: true,
  })
  prices: string;

  @Prop({
    required: true,
    trim: true,
  })
  discount?: string;
}
