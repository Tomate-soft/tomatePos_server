import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { SubCategoryFour } from './subCategoryFour.Schema';

@Schema({ timestamps: true })
export class SubCategoryThree {
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
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'SubCategoryFour' }],
  })
  subCategories: SubCategoryFour[];

  @Prop()
  parentCategory: string | null;

  @Prop({
    default: 'enabled',
  })
  status: 'disabled' | 'enabled';
}

export const SubCategoryThreeSchema =
  SchemaFactory.createForClass(SubCategoryThree);
