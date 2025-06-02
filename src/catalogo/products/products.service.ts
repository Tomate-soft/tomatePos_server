import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from '../../schemas/catalogo/products.schema';
import { Model } from 'mongoose';

import { DeleteResult } from 'mongodb';
import { CreateProductDto } from 'src/dto/catalogo/products/createProduct.dto';
import { UpdateProductDto } from 'src/dto/catalogo/products/updatedProduct.dto';
import { SubCategoryOne } from 'src/schemas/catalogo/subcategories/subCategoryOne.Schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<Products>,
    @InjectModel(SubCategoryOne.name)
    private subcategoryModel: Model<SubCategoryOne>,
  ) {}

  async findAll() {
    return this.productsModel
      .find()
      .populate({
        path: 'group',
        populate: [{ path: 'modifiers' }, { path: 'dishes' }],
      })
      .lean();
  }

  async create(createdProduct: CreateProductDto) {
    // buscar categoria
    const category = createdProduct.subcategory;
    const code = await this.calculateCode(createdProduct.subcategory);
    console.log(code);

    const data = {
      ...createdProduct,
      code,
      category,
    };

    const newProduct = new this.productsModel(data);
    return await newProduct.save();
  }

  async findOne(id: string) {
    return await this.productsModel.findById(id);
  }
  async delete(id: string) {
    return await this.productsModel.findByIdAndDelete(id);
  }
  async update(id: string, updatedProduct: UpdateProductDto) {
    try {
      const currentProduct = await this.productsModel.findByIdAndUpdate(
        id,
        updatedProduct,
        {
          new: true,
        },
      );
      return currentProduct;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('No se encontro el producto');
    }
  }
  async replace(): Promise<DeleteResult> {
    return await this.productsModel.deleteMany({}).exec();
  }

  async calculateCode(subcat: string) {
    console.log(subcat);
    const subcategory = await this.subcategoryModel.findOne({ name: subcat });
    console.log(subcategory);

    const lastProducts = await this.productsModel
      .find({ subcategory: subcat })
      .sort({ code: -1 })
      .exec();

    if (subcategory.name.length > 1 && lastProducts.length >= 1) {
      console.log('1');
      const lastProduct = lastProducts[0];
      const nextProductCode = (parseInt(lastProduct.code.slice(4, 8)) + 1)
        .toString()
        .padStart(4, '0'); // Aseguramos que el número tenga 4 dígitos
      return `${subcategory.code}${nextProductCode}`;
    }

    if (subcategory.code && lastProducts.length === 0) {
      console.log('2');
      return `${subcategory.code}0001`; // Si no hay productos, comienza con 0001
    }
  }
}
