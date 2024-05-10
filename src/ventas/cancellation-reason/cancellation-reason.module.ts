import { Module } from '@nestjs/common';
import { CancellationReasonController } from './cancellation-reason.controller';
import { CancellationReasonService } from './cancellation-reason.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CancellationReason,
  CancellationReasonSchema,
} from 'src/schemas/ventas/cancellationReason.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CancellationReason.name,
        schema: CancellationReasonSchema,
      },
    ]),
  ],
  controllers: [CancellationReasonController],
  providers: [CancellationReasonService],
})
export class CancellationReasonModule {}
