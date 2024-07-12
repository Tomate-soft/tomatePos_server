import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createPhoneDto } from 'src/dto/ventas/orders/phoneOrder/createPhoneOrder.dto';
import { PhoneOrder } from 'src/schemas/ventas/orders/phoneOrder.schema';

@Injectable()
export class PhoneOrderService {
  constructor(
    @InjectModel(PhoneOrder.name) private phoneOrderModel: Model<PhoneOrder>,
  ) {}

  async update(id: string, body: createPhoneDto) {
    return await this.phoneOrderModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async create(body: createPhoneDto) {
    const newOrder = new this.phoneOrderModel(body);
    return newOrder.save();
  }

  async findAll() {
    return await this.phoneOrderModel.find();
  }
}
