import { Module } from '@nestjs/common';
import { OperatingPeriodController } from './operating-period.controller';
import { OperatingPeriodService } from './operating-period.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
      },
    ]),
  ],
  controllers: [OperatingPeriodController],
  providers: [OperatingPeriodService],
})
export class OperatingPeriodModule {}
