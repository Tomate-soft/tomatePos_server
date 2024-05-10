import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Cancellations {
  @Prop({
    required: true,
    trim: true,
  })
  checkCode: string;

  @Prop({
    required: true,
    trim: true,
    // agregar valor default
  })
  sellType: string; // este sera un enum

  @Prop({
    required: true,
    trim: true,
  })
  cancellationMount: string;

  @Prop({
    required: true,
    trim: true,
  })
  cancellationBy: string;

  @Prop({
    required: true,
    trim: true,
  })
  cancellationFor: string;

  @Prop({
    required: true,
    trim: true,
  })
  cancellationReason: string;

  @Prop({
    required: true,
    trim: true,
  })
  cancellationDate: string;
}

export const CancellationSchema = SchemaFactory.createForClass(Cancellations);
