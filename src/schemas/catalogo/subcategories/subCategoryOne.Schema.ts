import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

enum Status {
  disabled = 'disabled',
  enabled = 'enabled',
}

@Schema({ timestamps: true })
export class SubCategoryOne {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  code: string;

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  categoryId: string;

  @Prop({
    default: Status.enabled,
  })
  status: Status;
}

export const SubCategoryOneSchema =
  SchemaFactory.createForClass(SubCategoryOne);
