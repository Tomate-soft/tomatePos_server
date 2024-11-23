import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdditionDto } from 'src/dto/catalogo/additions/createGroup.dto';
import { UpdateAdditionDto } from 'src/dto/catalogo/additions/updateGroup.dto';
import { Addition } from 'src/schemas/catalogo/additions.schema';
import { Dishes } from 'src/schemas/catalogo/dishes.schema';
import { Modifier } from 'src/schemas/catalogo/modifiers.Schema';

@Injectable()
export class AdditionsGroupService {
  constructor(
    @InjectModel(Addition.name) private additionModel: Model<Addition>,
    @InjectModel(Modifier.name) private modifierModel: Model<Modifier>,
    @InjectModel(Dishes.name) private dishesModel: Model<Dishes>,
  ) {}

  async findAll() {
    return await this.additionModel
      .find()
      .populate({
        path: 'modifiers',
      })
      .populate({
        path: 'dishes',
      })
      .lean();
  }
  async findOne(id: string) {
    return await this.additionModel.findById(id);
  }

  async create(body: CreateAdditionDto) {
    const newAddition = new this.additionModel(body);
    await newAddition.save();
    return newAddition;
  }

  async update(id: string, body: UpdateAdditionDto) {
    return await this.additionModel.findByIdAndUpdate(id, body, { new: true });
  }

  async delete(id: string) {
    return await this.additionModel.findByIdAndDelete(id);
  }
}
