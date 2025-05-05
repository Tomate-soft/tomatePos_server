import { Module } from '@nestjs/common';
import { RewritePeriodController } from './rewrite-period.controller';
import { RewritePeriodService } from './rewrite-period.service';
import {
  RewritedPeriod,
  RewritedPeriodSchema,
} from 'src/schemas/RewritedPeriod/rewritedPeriod';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewritedPeriod.name, schema: RewritedPeriodSchema },
    ]),
  ],
  controllers: [RewritePeriodController],
  providers: [RewritePeriodService],
})
export class RewritePeriodModule {}
