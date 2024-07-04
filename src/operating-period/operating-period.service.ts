import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { path } from 'pdfkit';
import { FINISHED_STATUS } from 'src/libs/status.libs';
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
      .populate({
        path: 'sellProcess',
        populate: [
          { path: 'bills', populate: { path: 'notes' } },
          { path: 'bills', populate: { path: 'payment' } },
        ],
      });

    return doc;
  }

  async getTotalSellsService() {
    const startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const doc = await this.operatingPeriodModel
      .find({
        createdAt: { $gte: startDate, $lt: endDate },
      })
      .populate({
        path: 'sellProcess',
        populate: [
          { path: 'bills', populate: { path: 'notes' } },
          { path: 'bills', populate: { path: 'payment' } },
          { path: 'togoorders', populate: { path: 'payment' } },
        ],
      });

    const onSiteOrders = doc.flatMap((docItem) =>
      docItem.sellProcess.flatMap((sellProcess) => sellProcess.bills),
    );

    const toGoOrders = doc.flatMap((docItem) =>
      docItem.sellProcess.flatMap((sellProcess) => sellProcess.togoorders),
    );

    const totalOrders = [...onSiteOrders, ...toGoOrders];

    const completeOrders = totalOrders.filter(
      (order) => order.status === FINISHED_STATUS,
    );

    return completeOrders;
  }
}
