import { Module } from '@nestjs/common';
import { CancellationsController } from './cancellations.controller';
import { CancellationsService } from './cancellations.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CancellationSchema,
  Cancellations,
} from 'src/schemas/ventas/cancellations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cancellations.name,
        schema: CancellationSchema,
      },
    ]),
  ],
  controllers: [CancellationsController],
  providers: [CancellationsService],
})
export class CancellationsModule {}
