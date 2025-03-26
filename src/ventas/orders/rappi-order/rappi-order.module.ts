import { Module } from '@nestjs/common';
import { RappiOrderController } from './rappi-order.controller';
import { RappiOrderService } from './rappi-order.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RappiOrder,
  RappiOrderSchema,
} from 'src/schemas/ventas/orders/rappiOrder.schema';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RappiOrder.name, schema: RappiOrderSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: OperatingPeriod.name, schema: OperatingPeriodSchema },
    ]),
  ],
  controllers: [RappiOrderController],
  providers: [RappiOrderService],
})
export class RappiOrderModule {}
