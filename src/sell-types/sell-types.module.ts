import { Module } from '@nestjs/common';
import { SellTypesController } from './sell-types.controller';
import { SellTypesService } from './sell-types.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SellType,
  SellTypeSchema,
} from 'src/schemas/TiposDeVenta/SellType.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SellType.name,
        schema: SellTypeSchema,
      },
    ]),
  ],
  controllers: [SellTypesController],
  providers: [SellTypesService],
})
export class SellTypesModule {}
