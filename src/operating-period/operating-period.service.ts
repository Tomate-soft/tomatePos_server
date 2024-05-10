import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';

@Injectable()
export class OperatingPeriodService {
  constructor(
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
  ) {}

  async findAll() {
    return this.operatingPeriodModel.find();
  }

  async getCurrent() {
    const startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const doc = await this.operatingPeriodModel
      .find({
        createdAt: { $gte: startDate, $lt: endDate },
      })
      .populate({ path: 'sellProcess' });

    return doc;
  }
}
