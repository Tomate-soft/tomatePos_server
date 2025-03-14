import { Schema, Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Addition } from '../catalogo/additions.schema';

interface Price {
  name: string;
  price: number;
}

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
  prices: Price[];

  @Prop({
    required: true,
    trim: true,
  })
  discount?: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Addition',
  })
  group?: Addition;
}
