import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePrinterDto } from 'src/dto/configuracion/printers/createPrinterDto';
import { UpdatePrinterDto } from 'src/dto/configuracion/printers/updatePrinterDto';
import { CreateSettingDto } from 'src/dto/setting/createSettingDto';
import { UpdateSettingDto } from 'src/dto/setting/updateSettingDto';
import { Printer } from 'src/schemas/configuracion/printer.schema';
import { Setting } from 'src/schemas/setting/setting.schema';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting.name) private settingModel: Model<Setting>,
    @InjectModel(Printer.name) private printerModel: Model<Printer>,
  ) {}
  async findAll() {
    return await this.settingModel.find().populate({
      path: 'printers',
    });
  }

  async findOne(id: string) {
    return await this.settingModel.findById(id).populate({
      path: 'printers',
    });
  }

  async create(body: CreateSettingDto) {
    const newDevice = new this.settingModel(body);
    return await newDevice.save();
  }

  async update(id: string, body: UpdateSettingDto) {
    return await this.settingModel.findByIdAndUpdate(id, body, { new: true });
  }

  async delete(id: string) {
    return await this.settingModel.findByIdAndDelete(id);
  }

  async findAllPrinters() {
    return await this.printerModel.find();
  }

  async createPrinters(body: CreatePrinterDto) {
    const newDevice = new this.printerModel(body);
    return await newDevice.save();
  }
  async updatePrinter(id: string, body: UpdatePrinterDto) {
    return await this.printerModel.findByIdAndUpdate(id, body, { new: true });
  }
}
