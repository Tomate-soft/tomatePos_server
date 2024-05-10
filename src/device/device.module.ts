import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from 'src/schemas/devices/device.schema';
import { Setting, SettingSchema } from 'src/schemas/setting/setting.schema';
import {
  Printer,
  PrinterSchema,
} from 'src/schemas/configuracion/printer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Device.name,
        schema: DeviceSchema,
      },
      {
        name: Setting.name,
        schema: SettingSchema,
      },
      {
        name: Printer.name,
        schema: PrinterSchema,
      },
    ]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
