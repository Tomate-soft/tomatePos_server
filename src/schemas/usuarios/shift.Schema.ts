import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class Shift {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  shiftName: string;

  @Prop({
    required: true,
    trim: true,
  })
  timeStartShift: string;

  @Prop({
    required: true,
    trim: true,
  })
  timeEndShift: string;
}

export const ShiftSchema = SchemaFactory.createForClass(Shift);
