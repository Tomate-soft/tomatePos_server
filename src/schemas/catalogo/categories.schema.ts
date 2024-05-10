import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { SubCategoryOne } from './subcategories/subCategoryOne.Schema';

@Schema({ timestamps: true })
export class Category {
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

  // categories.schema.ts
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'SubCategoryOne' }],
  })
  subCategories: SubCategoryOne[];

  @Prop()
  parentCategory: string | null;

  @Prop({
    default: 'enabled',
  })
  status: 'disabled' | 'enabled';
}

export const CategorySchema = SchemaFactory.createForClass(Category);
