import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from 'src/schemas/setting/setting.schema';
import { Printer } from 'src/schemas/configuracion/printer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Setting.name,
        schema: SettingSchema,
      },
      {
        name: Printer.name,
        schema: SettingSchema,
      },
    ]),
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
