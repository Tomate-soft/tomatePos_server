import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createShiftDto } from 'src/dto/usuarios/shifts/createShiftDto';
import { updateShiftDto } from 'src/dto/usuarios/shifts/updateShiftDto';
import { Shift } from 'src/schemas/usuarios/shift.Schema';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shift.name) private readonly shiftModel: Model<Shift>,
  ) {}

  async findAll() {
    return await this.shiftModel.find();
  }

  async findOne(id: string) {
    return await this.shiftModel.findById(id);
  }

  async create(body: createShiftDto) {
    const newShift = new this.shiftModel(body);
    return await newShift.save();
  }

  async delete(id: String) {
    return await this.shiftModel.findByIdAndDelete(id);
  }

  async update(id: string, body: updateShiftDto) {
    return await this.shiftModel.findByIdAndUpdate(id, body, { new: true });
  }
}
