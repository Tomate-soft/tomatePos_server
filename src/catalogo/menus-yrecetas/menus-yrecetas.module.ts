import { Module } from '@nestjs/common';
import { MenusYrecetasService } from './menus-yrecetas.service';
import { MenusYrecetasController } from './menus-yrecetas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MenusYRecetas,
  MenusYRecetasSchema,
} from 'src/schemas/catalogo/menusYRecetas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MenusYRecetas.name,
        schema: MenusYRecetasSchema,
      },
    ]),
  ],
  providers: [MenusYrecetasService],
  controllers: [MenusYrecetasController],
})
export class MenusYrecetasModule {}
