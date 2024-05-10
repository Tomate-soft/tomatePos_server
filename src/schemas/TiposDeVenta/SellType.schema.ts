import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class SellType {
  @Prop({
    unique: true,
    trim: true,
    required: true,
  })
  code: number;

  @Prop({
    trim: true,
    required: true,
  })
  sellName: string;

  @Prop({
    trim: true,
    required: true,
  })
  color: string;

  @Prop({
    trim: true,
    required: true,
  })
  status: 'enabled' | 'disabled';
}

export const SellTypeSchema = SchemaFactory.createForClass(SellType);
