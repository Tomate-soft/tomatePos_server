import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCancellationReasonDto } from 'src/dto/ventas/cancellationReasons/createCancellationReasonDto';
import { UpdateCancellationReasonDto } from 'src/dto/ventas/cancellationReasons/updateCancellationReasonDto';
import { CancellationReason } from 'src/schemas/ventas/cancellationReason.schema';

@Injectable()
export class CancellationReasonService {
  constructor(
    @InjectModel(CancellationReason.name)
    private cancellationReasonModel: Model<CancellationReason>,
  ) {}

  async findAll() {
    return await this.cancellationReasonModel.find();
  }
  async findOne(id: string) {
    return await this.cancellationReasonModel.findById(id);
  }
  async create(createdReason: CreateCancellationReasonDto) {
    const newReason = new this.cancellationReasonModel(createdReason);
    return await newReason.save();
  }
  async delete(id: string) {
    return this.cancellationReasonModel.findByIdAndDelete(id);
  }
  async update(id: string, updatedReason: UpdateCancellationReasonDto) {
    return this.cancellationReasonModel.findByIdAndUpdate(id, updatedReason, {
      new: true,
    });
  }
}
