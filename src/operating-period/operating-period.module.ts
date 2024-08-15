import { Module } from '@nestjs/common';
import { OperatingPeriodController } from './operating-period.controller';
import { OperatingPeriodService } from './operating-period.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
      },
      {
        name: Branch.name,
        schema: BranchSchema,
      },
    ]),
  ],
  controllers: [OperatingPeriodController],
  providers: [OperatingPeriodService],
})
export class OperatingPeriodModule {}
