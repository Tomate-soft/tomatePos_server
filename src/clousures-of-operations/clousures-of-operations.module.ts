import { Module } from '@nestjs/common';
import { ClousuresOfOperationsController } from './clousures-of-operations.controller';
import { ClousuresOfOperationsService } from './clousures-of-operations.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import { ReportsService } from 'src/reports/reports.service';

/**
 * Module for handling closures of operations.
 */
/**
 * Module for handling closures of operations.
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OperatingPeriod.name, schema: OperatingPeriodSchema },
      { name: CashierSession.name, schema: CashierSessionSchema },
    ]),
  ],
  controllers: [ClousuresOfOperationsController],
  providers: [ClousuresOfOperationsService, ReportsService],
})
export class ClousuresOfOperationsModule {}
