import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createDishesDto } from 'src/dto/catalogo/dishes/createdDishes.dto';
import { updateDishesDto } from 'src/dto/catalogo/dishes/updatedDishes.dto';
import { Dishes } from 'src/schemas/catalogo/dishes.schema';
import { DeleteResult } from 'mongodb';

@Injectable()
export class DishesService {
  private currentCode = 'A00';

  constructor(@InjectModel(Dishes.name) private dishesModel: Model<Dishes>) {}

  private generateNextCode(): string {
    const prefix = this.currentCode[0];
    const numericPart = parseInt(this.currentCode.slice(3));

    if (numericPart < 99) {
      this.currentCode = `${prefix}${String(numericPart + 1).padStart(2, '0')}`;
    } else {
      const nextPrefix = String.fromCharCode(prefix.charCodeAt(0) + 1);
      this.currentCode = `${nextPrefix}00`;
    }
    return this.currentCode;
  }

  async findAll(skip: number) {
    const skipValue = skip ? skip : 0;
    const limitValue = skip ? 1 : 0;
    return await this.dishesModel.find().skip(skipValue).limit(limitValue);
  }

  async findOne(id: string) {
    return await this.dishesModel.findById(id);
  }

  async create(createDishes: createDishesDto) {
    console.log(createDishes);
    const newDish = new this.dishesModel({
      ...createDishes,
      code: this.generateNextCode(), // Automatically assign the code
    });
    console.log(newDish);
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
