import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Bills } from 'src/schemas/ventas/bills.schema';

@Injectable()
export class ProcessService {
  constructor(
    @InjectModel(Bills.name) private billsModel: Model<Bills>,
    @InjectModel(OperatingPeriod.name)
    private operatingModel: Model<OperatingPeriod>,
    private operatingPeriodService: OperatingPeriodService,
  ) {}

  getTotalCurrentBills = async () => {
    const session = await this.operatingModel.startSession();
    session.startTransaction();
    try {
      const currentPeriod = await this.operatingPeriodService.getCurrent();
      const cashierSessions = currentPeriod[0].sellProcess;
      const allOrders = cashierSessions.reduce((acc, session) => {
        return acc.concat(
          session.bills,
          session.phoneOrders,
          session.rappiOrders,
          session.togoorders,
        );
      }, []);

      console.log(allOrders.length);

      await session.commitTransaction();
      session.endSession();
      return allOrders;
    } catch (error) {}
  };
}
