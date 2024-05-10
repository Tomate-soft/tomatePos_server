import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createDishesDto } from 'src/dto/catalogo/dishes/createdDishes.dto';
import { updateDishesDto } from 'src/dto/catalogo/dishes/updatedDishes.dto';
import { Dishes } from 'src/schemas/catalogo/dishes.schema';
import { DeleteResult } from 'mongodb';

@Injectable()
export class DishesService {
  constructor(@InjectModel(Dishes.name) private dishesModel: Model<Dishes>) {}

  async findAll() {
    return await this.dishesModel.find();
  }

  async findOne(id: string) {
    return await this.dishesModel.findById(id);
  }

  async create(createDishes: createDishesDto) {
    const newDish = new this.dishesModel(createDishes);
    return await newDish.save();
  }
  async delete(id: string) {
    return await this.dishesModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedDishes: updateDishesDto) {
    return await this.dishesModel.findByIdAndUpdate(id, updatedDishes, {
      new: true,
    });
  }

  async replace(): Promise<DeleteResult> {
    return await this.dishesModel.deleteMany({}).exec();
  }
}
