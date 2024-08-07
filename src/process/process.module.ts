import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bills, BillSchema } from 'src/schemas/ventas/bills.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bills.name, schema: BillSchema },
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
      },
    ]),
  ],
  controllers: [ProcessController],
  providers: [ProcessService, OperatingPeriodService],
})
export class ProcessModule {}
