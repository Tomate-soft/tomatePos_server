import { Module } from '@nestjs/common';
import { RewritePeriodController } from './rewrite-period.controller';
import { RewritePeriodService } from './rewrite-period.service';

@Module({
  controllers: [RewritePeriodController],
  providers: [RewritePeriodService]
})
export class RewritePeriodModule {}
