import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTillDto } from 'src/dto/caja/createTillDto';
import { UpdateTillDto } from 'src/dto/caja/updateTillDto';
import { Till } from 'src/schemas/caja/till.schema';

@Injectable()
export class TillService {
  constructor(
    @InjectModel(Till.name) private readonly tillModel: Model<Till>,
  ) {}

  async findAll() {
    return await this.tillModel.find();
  }

  async findOne(id: string) {
    return await this.tillModel.findById(id);
  }

  async create(body: CreateTillDto) {
    const newTill = new this.tillModel(body);
    return await newTill.save();
  }

  async delete(id: string) {
    return await this.tillModel.findByIdAndDelete(id);
  }

  async update(id: string, body: UpdateTillDto) {
    return await this.tillModel.findByIdAndUpdate(id, body, { new: true });
  }
}
