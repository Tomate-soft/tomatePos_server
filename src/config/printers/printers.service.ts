import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePrinterDto } from 'src/dto/configuracion/printers/createPrinterDto';
import { UpdatePrinterDto } from 'src/dto/configuracion/printers/updatePrinterDto';
import { Printer } from 'src/schemas/configuracion/printer.schema';

@Injectable()
export class PrintersService {
  constructor(
    @InjectModel(Printer.name) private printerModel: Model<Printer>,
  ) {}

  async findAll() {
    return await this.printerModel.find();
  }

  async findOne(id: string) {
    return await this.printerModel.findById(id);
  }

  async create(body: CreatePrinterDto) {
    const newPrinter = new this.printerModel(body);
    return await newPrinter.save();
  }
  async update(id: string, body: UpdatePrinterDto) {
    return await this.printerModel.findByIdAndUpdate(id, body, { new: true });
  }
  async delete(id: string) {
    return await this.printerModel.findByIdAndDelete(id);
  }
}
