import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Products } from 'src/schemas/catalogo/products.schema';
import { SubCategoryOne } from 'src/schemas/catalogo/subcategories/subCategoryOne.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Products.name,
        schema: ProductSchema,
      },
      {
        name: SubCategoryOne.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
