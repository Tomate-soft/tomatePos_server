import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class MenusYRecetas {
  @Prop({
    required: true,
    trim: true,
  })
  category: string;

  @Prop({
    unique: true,
    trim: true,
  })
  code: string;

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  productName: string;

  @Prop({
    required: true,
    trim: true,
  })
  serving: string;

  @Prop({
    required: true,
    trim: true,
  })
  unit: 'gr' | 'kg | L | mm | bolsas |';

  @Prop({
    required: true,
    trim: true,
  })
  priceNotIVA: string;

  @Prop({
    required: true,
    trim: true,
  })
  recommendedPrice: string;

  @Prop({
    default: 'enabled',
  })
  status: 'disabled' | 'enabled';
}

export const MenusYRecetasSchema = SchemaFactory.createForClass(MenusYRecetas);
