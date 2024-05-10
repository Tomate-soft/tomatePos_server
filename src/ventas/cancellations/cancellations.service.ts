import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCancellationDto } from 'src/dto/ventas/cancellations/createCancellationDto';
import { UpdateCancellationDto } from 'src/dto/ventas/cancellations/updateCancellationDto';
import { Cancellations } from 'src/schemas/ventas/cancellations.schema';

@Injectable()
export class CancellationsService {
  constructor(
    @InjectModel(Cancellations.name)
    private cancellationModel: Model<Cancellations>,
  ) {}

  async findAll() {
    return await this.cancellationModel.find();
  }

  async findOne(id: string) {
    return await this.cancellationModel.findById(id);
  }

  async create(createdCancellation: CreateCancellationDto) {
    const newCancellation = new this.cancellationModel(createdCancellation);
    return await newCancellation.save();
  }

  async delete(id: string) {
    return this.cancellationModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedCancellation: UpdateCancellationDto) {
    return await this.cancellationModel.findByIdAndUpdate(
      id,
      updatedCancellation,
      { new: true },
    );
  }
}
