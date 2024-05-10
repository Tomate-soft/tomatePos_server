import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateCategoryDto } from 'src/dto/catalogo/categories/createCategory.dto';
import { SubCategoryTwo } from './subCategoryTwo.schema';

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
  categoryName: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'SubCategoryTwo' }],
  })
  subCategories: SubCategoryTwo[];
  @Prop()
  parentCategory: string | null;

  @Prop({
    default: 'enabled',
  })
  status: 'disabled' | 'enabled';
}

export const SubCategoryOneSchema =
  SchemaFactory.createForClass(SubCategoryOne);
  
