import { Module } from '@nestjs/common';
import { DepartamentsService } from './departaments.service';
import { DepartamentsController } from './departaments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Departament,
  DepartamentSchema,
} from 'src/schemas/usuarios/departaments.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Departament.name,
        schema: DepartamentSchema,
      },
    ]),
  ],
  providers: [DepartamentsService],
  controllers: [DepartamentsController],
})
export class DepartamentsModule {}
