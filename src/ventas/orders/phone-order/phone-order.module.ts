import { Module } from '@nestjs/common';
import { PhoneOrderController } from './phone-order.controller';
import { PhoneOrderService } from './phone-order.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PhoneOrder,
  PhoneOrderSchema,
} from 'src/schemas/ventas/orders/phoneOrder.schema';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhoneOrder.name, schema: PhoneOrderSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: OperatingPeriod.name, schema: OperatingPeriodSchema },
    ]),
  ],
  controllers: [PhoneOrderController],
  providers: [PhoneOrderService],
})
export class PhoneOrderModule {}
