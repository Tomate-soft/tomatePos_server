import { Module } from '@nestjs/common';
import { PhoneOrderController } from './phone-order.controller';
import { PhoneOrderService } from './phone-order.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PhoneOrder,
  PhoneOrderSchema,
} from 'src/schemas/ventas/orders/phoneOrder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhoneOrder.name, schema: PhoneOrderSchema },
    ]),
  ],
  controllers: [PhoneOrderController],
  providers: [PhoneOrderService],
})
export class PhoneOrderModule {}
