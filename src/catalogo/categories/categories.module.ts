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
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
