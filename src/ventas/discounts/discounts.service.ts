import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDiscountDto } from 'src/dto/ventas/discounts/createDiscountDto';
import { UpdateDiscountDto } from 'src/dto/ventas/discounts/updateDiscountsDto';
import { Discount } from 'src/schemas/ventas/discounts.schema';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<Discount>,
  ) {}

  async findAll() {
    return await this.discountModel.find();
  }

  async findOne(id: string) {
    return await this.discountModel.findById(id);
  }
  async create(createdDiscount: CreateDiscountDto) {
    return await this.discountModel.create(createdDiscount);
  }
  async delete(id: string) {
    return await this.discountModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedDiscount: UpdateDiscountDto) {
    return await this.discountModel.findByIdAndUpdate(id, updatedDiscount, {
      new: true,
    });
  }
}
