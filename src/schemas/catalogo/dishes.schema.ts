import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Dishes {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  category: string;

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

  priceInSite: number;

  @Prop({
    required: true,
    trim: true,
    default: 0.0,
  })
  priceToGo: number;

  @Prop({
    required: true,
    trim: true,
    default: 0.0,
  })
  priceCallOrder: number;

  @Prop({
    required: true,
    trim: true,
    default: 0.0,
  })
  priceDelivery: number;

  @Prop({
    default: 'enabled',
  })
  status: 'disabled' | 'enabled';
}

export const DishesSchema = SchemaFactory.createForClass(Dishes);
