import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSellTypeDto } from 'src/dto/tiposDeVenta/createSellType';
import { UpdateSellTypeDto } from 'src/dto/tiposDeVenta/updateSellType';
import { SellType } from 'src/schemas/TiposDeVenta/SellType.schema';

@Injectable()
export class SellTypesService {
  constructor(
    @InjectModel(SellType.name) private sellTypeModel: Model<SellType>,
  ) {}

  async findAll() {
    return this.sellTypeModel.find();
  }
  async findOne(id: string) {
    return this.sellTypeModel.findById(id);
  }
  async create(createSellType: CreateSellTypeDto) {
    const newSellType = new this.sellTypeModel(createSellType);
    return await newSellType.save();
  }

  async delete(id: string) {
    return this.sellTypeModel.findByIdAndDelete(id);
  }

  async update(id: string, updateSellType: UpdateSellTypeDto) {
    return this.sellTypeModel.findByIdAndUpdate(id, updateSellType, {
      new: true,
    });
  }
}
