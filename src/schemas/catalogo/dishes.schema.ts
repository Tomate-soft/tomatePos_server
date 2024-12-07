import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

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

@Schema({ timestamps: true })
export class Dishes {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  code: string;

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  dishesName: string;

  @Prop({
    default: 'enabled',
  })
  status: 'disabled' | 'enabled';

  @Prop({
    required: true,
    trim: true,
  })
  prices: PricesList[];
}

export const DishesSchema = SchemaFactory.createForClass(Dishes);
