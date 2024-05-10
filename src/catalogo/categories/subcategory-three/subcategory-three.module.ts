import { Module } from '@nestjs/common';
import { SubcategoryThreeController } from './subcategory-three.controller';
import { SubcategoryThreeService } from './subcategory-three.service';
import { MongooseModule } from '@nestjs/mongoose';
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
        name: SubCategoryThree.name,
        schema: SubCategoryThreeSchema,
      },
      {
        name: SubCategoryFour.name,
        schema: SubCategoryFourSchema,
      },
    ]),
  ],
  controllers: [SubcategoryThreeController],
  providers: [SubcategoryThreeService],
})
export class SubcategoryThreeModule {}
