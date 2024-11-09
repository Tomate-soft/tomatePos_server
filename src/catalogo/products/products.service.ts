import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from '../../schemas/catalogo/products.schema';
import { Model } from 'mongoose';

import { DeleteResult } from 'mongodb';
import { CreateProductDto } from 'src/dto/catalogo/products/createProduct.dto';
import { UpdateProductDto } from 'src/dto/catalogo/products/updatedProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<Products>,
  ) {}

  async findAll() {
    return await this.productsModel.find();
  }

  async create(createdProduct: CreateProductDto) {
    // buscar categoria
    const category = 'Harcodeada por ahoa';
    const code = 'HARDCODED';
    // calcular el codigo

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
    return await this.productsModel.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });
  }
  async replace(): Promise<DeleteResult> {
    return await this.productsModel.deleteMany({}).exec();
  }
}
