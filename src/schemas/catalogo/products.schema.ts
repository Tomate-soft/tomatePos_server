import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Addition } from './additions.schema';

//Schema for products

enum Status {
  disabled = 'disabled',
  enabled = 'enabled',
}

enum Prices {
  ONSITE = 'ON_SITE',
  TOGO = 'TOGO',
  RAPPI = 'RAPPI',
  PHONE = 'PHONE',
  PRICE_LIST_FIVE = 'PRICE_LIST_FIVE',
  PRICE_LIST_SIX = 'PRICE_LIST_SIX',
  PRICE_LIST_SEVEN = 'PRICE_LIST_SEVEN',
  PRICE_LIST_EIGHT = 'PRICE_LIST_EIGHT',
  PRICE_LIST_NINE = 'PRICE_LIST_NINE',
  PRICE_LIST_TEN = 'PRICE_LIST_TEN',
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

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Addition',
  })
  group?: Addition;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
