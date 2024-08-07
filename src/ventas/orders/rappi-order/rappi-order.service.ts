import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createRappiOrderDto } from 'src/dto/ventas/orders/rappiOrder/createRappiOrder.Dto';
import { updateRappiOrderDto } from 'src/dto/ventas/orders/rappiOrder/updateRappiOrder.Dto';
import { RappiOrder } from 'src/schemas/ventas/orders/rappiOrder.schema';

@Injectable()
export class RappiOrderService {
  constructor(
    @InjectModel(RappiOrder.name) private rappiOrderModel: Model<RappiOrder>,
  ) {}

  async update(id: string, body: updateRappiOrderDto) {
    return await this.rappiOrderModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async create(body: createRappiOrderDto) {
    const newOrder = new this.rappiOrderModel(body);
    return newOrder.save();
  }

  async findAll() {
    return await this.rappiOrderModel.find();
  }
}
