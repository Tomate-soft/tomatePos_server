import { Module } from '@nestjs/common';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dishes, DishesSchema } from 'src/schemas/catalogo/dishes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Dishes.name,
        schema: DishesSchema,
      },
    ]),
  ],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
