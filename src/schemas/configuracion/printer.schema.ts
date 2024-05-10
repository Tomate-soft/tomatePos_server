import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Printer {
  @Prop({
    required: true,
    trim: true,
  })
  printerName: string;

  @Prop({
    required: true,
    trim: true,
  })
  tcp: string;
}

export const PrinterSchema = SchemaFactory.createForClass(Printer);
