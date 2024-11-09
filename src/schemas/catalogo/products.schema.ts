import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
//Schema for products

enum Status {
  disabled = 'disabled',
  enabled = 'enabled',
}

enum Prices {
  ONSITE = 'ONSITE',
  TOGO = 'TOGO',
  RAPPI = 'RAPPI',
  PHONE = 'PHONE',
}

interface PricesList {
  name: Prices;
  price: number;
}

@Schema({ timestamps: true, versionKey: false })
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
  subcategory: string;

  @Prop({
    required: true,
    trim: true,
  })
  productName: string;

  @Prop({
    default: Status.enabled,
  })
  status?: Status;

  @Prop({
    default: 1,
  })
  quantity?: number;

  @Prop({
    required: true,
    trim: true,
    default: false,
  })
  active?: boolean;

  @Prop({
    required: true,
    trim: true,
  })
  prices: PricesList[];
}

export const ProductSchema = SchemaFactory.createForClass(Products);
