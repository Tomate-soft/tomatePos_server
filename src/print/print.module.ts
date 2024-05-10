import { Module } from '@nestjs/common';
import { PrintController } from './print.controller';
import { PrintService } from './print.service';
import {
  Printer,
  PrinterSchema,
} from 'src/schemas/configuracion/printer.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PrintController],
  providers: [PrintService],
})
export class PrintModule {}
