import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
} from 'src/schemas/catalogo/categories.schema';
import {
  SubCategoryOne,
  SubCategoryOneSchema,
} from 'src/schemas/catalogo/subcategories/subCategoryOne.Schema';
import {
  SubCategoryTwo,
  SubCategoryTwoSchema,
} from 'src/schemas/catalogo/subcategories/subCategoryTwo.schema';
import {
  SubCategoryThree,
  SubCategoryThreeSchema,
} from 'src/schemas/catalogo/subcategories/subCategoryThree.Schema';
import {
  SubCategoryFour,
  SubCategoryFourSchema,
} from 'src/schemas/catalogo/subcategories/subCategoryFour.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: SubCategoryOne.name,
        schema: SubCategoryOneSchema,
      },
      {
        name: SubCategoryTwo.name,
        schema: SubCategoryTwoSchema,
      },
      {
        name: SubCategoryThree.name,
        schema: SubCategoryThreeSchema,
      },
      {
        name: SubCategoryFour.name,
        schema: SubCategoryFourSchema,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
