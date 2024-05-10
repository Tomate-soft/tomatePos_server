import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TillController } from './till.controller';
import { TillService } from './till.service';
import { Till, TillSchema } from 'src/schemas/caja/till.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Till.name,
        schema: TillSchema,
      },
    ]),
  ],
  controllers: [TillController],
  providers: [TillService],
})
export class TillModule {}
