import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FINISHED_STATUS } from 'src/libs/status.libs';
import { Branch } from 'src/schemas/business/branchSchema';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';

@Injectable()
export class OperatingPeriodService {
  constructor(
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
  ) {}

  async findAll() {
    return this.operatingPeriodModel.find();
  }

  async getCurrent() {
    const session = await this.branchModel.startSession();
    session.startTransaction();
    try {
      const branchId = '66bd36e5a107f6584ef54dca';
      const branch = await this.branchModel
        .findById(branchId)
        .populate({ path: 'operatingPeriod' });
      if (!branch) {
        throw new Error('No se encontro la branch');
      }
      const operatingPeriod = await this.operatingPeriodModel
        .findById(branch.operatingPeriod)
        .populate({
          path: 'sellProcess',
          populate: [
            { path: 'bills', populate: { path: 'notes' } },
            { path: 'bills', populate: { path: 'payment' } },
          ],
        });
      await session.commitTransaction();
      session.endSession();
      return [operatingPeriod];
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
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
