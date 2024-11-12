import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from 'src/schemas/devices/device.schema';
import { Setting, SettingSchema } from 'src/schemas/setting/setting.schema';
import {
  Printer,
  PrinterSchema,
} from 'src/schemas/configuracion/printer.schema';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';

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
      {
        name: Branch.name,
        schema: BranchSchema,
      },
    ]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
