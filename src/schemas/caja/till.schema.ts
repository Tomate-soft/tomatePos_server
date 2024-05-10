import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Till {
  @Prop({
    trim: true,
    required: true,
  })
  device: string;

  @Prop({
    trim: true,
    required: true,
  })
  user: string;

  @Prop({
    trim: true,
    required: true,
    default: '0.00',
  })
  cash: string;

  @Prop({
    trim: true,
    required: true,
    default: '0.00',
  })
  debit: string;

  @Prop({
    trim: true,
    required: true,
    default: '0.00',
  })
  credit: string;

  @Prop({
    trim: true,
    required: true,
    default: '0.00',
  })
  trnsfer: string;

  @Prop({
    trim: true,
    required: true,
    default: '0.00',
  })
  rappi: string;

  @Prop({
    trim: true,
    required: true,
    default: '0.00',
  })
  didi: string;

  @Prop({
    trim: true,
    required: true,
    default: '0.00',
  })
  uber: string;
}

export const TillSchema = SchemaFactory.createForClass(Till);
