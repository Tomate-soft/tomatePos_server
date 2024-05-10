import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
//Schema for products
@Schema({ timestamps: true })
export class Products {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  code: string;
  @Prop({
    required: true,
    trim: true,
  })
  category: string;
  @Prop({
    required: true,
    trim: true,
  })
  productName: string;
  @Prop({
    required: true,
    trim: true,
    default: '00.00',
  })
  priceInSite: string;
  @Prop({
    required: true,
    trim: true,
    default: '00.00',
  })
  priceToGo: string;
  @Prop({
    required: true,
    trim: true,
    default: '00.00',
  })
  priceCallOrder: string;
  @Prop({
    required: true,
    trim: true,
    default: '00.00',
  })
  priceDelivery: string;

  @Prop({
    default: 'enabled',
  })
  status: 'disabled' | 'enabled';

  @Prop({
    default: 1,
  })
  quantity: number;

  @Prop({
    required: true,
    trim: true,
    default: '00.00',
  })
  priceInSiteBill?: string;
  @Prop({
    required: true,
    trim: true,
    default: '00.00',
  })
  priceToGoBill?: string;
  @Prop({
    required: true,
    trim: true,
    default: '00.00',
  })
  priceCallOrderBill?: string;
  @Prop({
    required: true,
    trim: true,
    default: '00.00',
  })
  priceDeliveryBill?: string;

  @Prop({
    required: true,
    trim: true,
    default: false,
  })
  active?: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
