import { Module } from '@nestjs/common';
import { SubcategoryOneService } from './subcategory-one.service';
import { SubcategoryOneController } from './subcategory-one.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SubCategoryOne,
  SubCategoryOneSchema,
} from 'src/schemas/catalogo/subcategories/subCategoryOne.Schema';
import {
  Category,
  CategorySchema,
} from 'src/schemas/catalogo/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubCategoryOne.name,
        schema: SubCategoryOneSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [SubcategoryOneService],
  controllers: [SubcategoryOneController],
})
export class SubcategoryOneModule {}
