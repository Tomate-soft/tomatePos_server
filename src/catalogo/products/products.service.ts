import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from '../../schemas/catalogo/products.schema';
import { Model } from 'mongoose';
import { createProductDto } from 'src/dto/catalogo/products/createProduct.dto';
import { updateProductDto } from 'src/dto/catalogo/products/updatedProduct.dto';
import { DeleteResult } from 'mongodb';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<Products>,
  ) {}

  async findAll() {
    return await this.productsModel.find();
  }

  async create(createdProduct: createProductDto) {
    const newProduct = new this.productsModel(createdProduct);
    return await newProduct.save();
  }
  async findOne(id: string) {
    return await this.productsModel.findById(id);
  }
  async delete(id: string) {
    return await this.productsModel.findByIdAndDelete(id);
  }
  async update(id: string, updatedProduct: updateProductDto) {
    return await this.productsModel.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });
  }
  async replace(): Promise<DeleteResult> {
    return await this.productsModel.deleteMany({}).exec();
  }
}
