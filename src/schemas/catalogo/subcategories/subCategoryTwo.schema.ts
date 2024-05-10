import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { SubCategoryThree } from './subCategoryThree.Schema';

@Schema({ timestamps: true })
export class SubCategoryTwo {
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
  categoryName: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'SubCategoryThree' }],
  })
  subCategories: SubCategoryThree[];

  @Prop()
  parentCategory: string | null;

  @Prop({
    default: 'enabled',
  })
  status: 'disabled' | 'enabled';
}

export const SubCategoryTwoSchema =
  SchemaFactory.createForClass(SubCategoryTwo);
