import { Module } from '@nestjs/common';
import { AdditionsGroupController } from './additions-group.controller';
import { AdditionsGroupService } from './additions-group.service';

@Module({
  controllers: [AdditionsGroupController],
  providers: [AdditionsGroupService]
})
export class AdditionsGroupModule {}
