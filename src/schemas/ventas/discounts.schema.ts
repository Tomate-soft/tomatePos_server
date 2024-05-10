import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Discount {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  checkCode: number;

  @Prop({
    trim: true,
    required: true,
  })
  checkTotal: string;

  @Prop({
    trim: true,
    required: true,
  })
  discountMount: number;

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

  // le voy  a mandar toda la info para qaue se calcule este discount Total automaticamente, preguntarle a chatGPT como hacerlo
  /* 
  @Prop({
    trim: true,
  })
  discountTotal: string;
}
*/
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
