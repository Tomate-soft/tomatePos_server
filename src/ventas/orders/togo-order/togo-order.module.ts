import { Module } from '@nestjs/common';
import { TogoOrderController } from './togo-order.controller';
import { TogoOrderService } from './togo-order.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ToGoOrder,
  ToGoOrderSchema,
} from 'src/schemas/ventas/orders/toGoOrder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ToGoOrder.name, schema: ToGoOrderSchema },
    ]),
  ],
  controllers: [TogoOrderController],
  providers: [TogoOrderService],
})
export class TogoOrderModule {}
