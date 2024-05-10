import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Notes {
  @Prop({
    trim: true,
    required: true,
  })
  checkCode: string;

  @Prop({
    required: true,
    trim: true,
  })
  accountId: string;

  @Prop({
    required: true,
    trim: true,
  })
  noteNumber: number;

  @Prop({
    trim: true,
  })
  noteName?: string;

  @Prop({
    required: true,
    trim: true,
  })
  paymentCode: string;

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
    default: [],
    trim: true,
  })
  products: {}[];

  @Prop({
    required: true,
    trim: true,
  })
  checkTotal: string;

  @Prop({
    required: true,
    trim: true,
  })
  status: 'enabled' | 'disabled' | 'pending' | 'cancel';

  @Prop({
    required: true,
    trim: true,
  })
  cashier: string;

  @Prop({
    required: true,
    trim: true,
  })
  paymentDate: string;
}

export const NoteSchema = SchemaFactory.createForClass(Notes);
