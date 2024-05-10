import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

// Queda pendiente para ver si
// se va a implementar o no
// Eliminar si ya se dicidio no usar
// junto con todo el Modulo de "product"

@Schema({ timestamps: true })
export class Product {
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
  })
  checkId: string;

  @Prop({
    required: true,
    trim: true,
  })
  sellType: string;

  @Prop({
    required: true,
    trim: true,
  })
  user: string;

  @Prop({
    required: true,
    trim: true,
  })
  device: string;

  @Prop({
    required: true,
    trim: true,
  })
  price: string;

  @Prop({
    required: true,
    trim: true,
  })
  discount?: string;

  // lo dejamos inconcluso --- category: string;
}
