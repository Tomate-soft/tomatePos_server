import { Module } from '@nestjs/common';
import { SubcategoryFourService } from './subcategory-four.service';
import { SubcategoryFourController } from './subcategory-four.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubCategoryFour,
  SubCategoryFourSchema,
} from 'src/schemas/catalogo/subcategories/subCategoryFour.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubCategoryFour.name,
        schema: SubCategoryFourSchema,
      },
    ]),
  ],
  providers: [SubcategoryFourService],
  controllers: [SubcategoryFourController],
})
export class SubcategoryFourModule {}
