import { Module } from '@nestjs/common';
import { ModificationsController } from './modifications.controller';
import { ModificationsService } from './modifications.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Modifier,
  ModifierSchema,
} from 'src/schemas/catalogo/modifiers.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Modifier.name,
        schema: ModifierSchema,
      },
    ]),
  ],
  controllers: [ModificationsController],
  providers: [ModificationsService],
})
export class ModificationsModule {}
