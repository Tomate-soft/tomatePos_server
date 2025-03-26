import { Module } from '@nestjs/common';
import { TogoOrderController } from './togo-order.controller';
import { TogoOrderService } from './togo-order.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ToGoOrder,
  ToGoOrderSchema,
} from 'src/schemas/ventas/orders/toGoOrder.schema';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ToGoOrder.name, schema: ToGoOrderSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: OperatingPeriod.name, schema: OperatingPeriodSchema },
    ]),
  ],
  controllers: [TogoOrderController],
  providers: [TogoOrderService],
})
export class TogoOrderModule {}
