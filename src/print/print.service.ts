import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePrinterDto } from 'src/dto/configuracion/printers/createPrinterDto';
import { UpdatePrinterDto } from 'src/dto/configuracion/printers/updatePrinterDto';
import { Printer } from 'src/schemas/configuracion/printer.schema';

@Injectable()
export class PrintService {}
