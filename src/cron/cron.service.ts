import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as cron from 'node-cron';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    this.initializeCronJobs();
  }

  private initializeCronJobs() {
    // Ejecutar una tarea cada minuto
    cron.schedule('0 0 * * *', async () => {
      console.log(new Date().toLocaleDateString());
      const newOperatingPeriod = new this.operatingPeriodModel();
      await newOperatingPeriod.save();
      console.log('Se creo un Item');
      console.log(newOperatingPeriod);
      return newOperatingPeriod;
    });

    cron.schedule('10 21 * * * ', async () => {
      const UserUpdated = await this.userModel.updateMany(
        {},
        { $set: { dailyRegister: null } },
      );
      if (UserUpdated) {
        console.log('registro de usuarios reseteado  con exito');
      }
    });
  }
}
