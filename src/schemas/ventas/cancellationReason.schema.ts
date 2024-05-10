import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class CancellationReason {
  @Prop({
    unique: true,
    trim: true,
    required: true,
  })
  keyReason: string;

  @Prop({
    unique: true,
    trim: true,
    required: true,
  })
  reasonName: string;

  @Prop({
    default: true,
  })
  substraction?: boolean;
}

export const CancellationReasonSchema =
  SchemaFactory.createForClass(CancellationReason);
