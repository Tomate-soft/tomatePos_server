import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSettingDto } from 'src/dto/setting/createSettingDto';
import { UpdateSettingDto } from 'src/dto/setting/updateSettingDto';
import { Setting } from 'src/schemas/setting/setting.schema';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting.name) private settingModel: Model<Setting>,
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
}
