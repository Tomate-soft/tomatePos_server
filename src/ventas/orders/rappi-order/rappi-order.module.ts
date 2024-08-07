import { Module } from '@nestjs/common';
import { RappiOrderController } from './rappi-order.controller';
import { RappiOrderService } from './rappi-order.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RappiOrder,
  RappiOrderSchema,
} from 'src/schemas/ventas/orders/rappiOrder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RappiOrder.name, schema: RappiOrderSchema },
    ]),
  ],
  controllers: [RappiOrderController],
  providers: [RappiOrderService],
})
export class RappiOrderModule {}
