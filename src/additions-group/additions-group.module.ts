import { Module } from '@nestjs/common';
import { AdditionsGroupController } from './additions-group.controller';
import { AdditionsGroupService } from './additions-group.service';
import {
  Addition,
  AdditionsSchema,
} from 'src/schemas/catalogo/additions.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Modifier } from 'src/schemas/catalogo/modifiers.Schema';
import { Dishes } from 'src/schemas/catalogo/dishes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Addition.name,
        schema: AdditionsSchema,
      },
      {
        name: Modifier.name,
        schema: AdditionsSchema,
      },
      {
        name: Dishes.name,
        schema: AdditionsSchema,
      },
    ]),
  ],
  controllers: [AdditionsGroupController],
  providers: [AdditionsGroupService],
})
export class AdditionsGroupModule {}
