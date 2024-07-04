import { Module } from '@nestjs/common';
import { RappiOrderController } from './rappi-order.controller';
import { RappiOrderService } from './rappi-order.service';

@Module({
  controllers: [RappiOrderController],
  providers: [RappiOrderService]
})
export class RappiOrderModule {}
