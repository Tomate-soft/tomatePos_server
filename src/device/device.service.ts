import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeviceDto } from 'src/dto/devices/createDeviceDto';
import { UpdateDeviceDto } from 'src/dto/devices/updateDeviceDto';
import { Device } from 'src/schemas/devices/device.schema';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<Device>) {}
  async findAll() {
    return await this.deviceModel.find().populate({
      path: 'settings',
      populate: {
        path: 'printers',
      },
    });
  }
  async findOneBySerial(deviceIdn: string) {
    return await this.deviceModel.findOne({ deviceIdn: deviceIdn }).populate({
      path: 'settings',
      populate: {
        path: 'printers',
      },
    });
  }

  async findOne(id: string) {
    return await this.deviceModel.findById(id).populate({
      path: 'settings',
      populate: {
        path: 'printers',
      },
    });
  }

  async create(body: CreateDeviceDto) {
    const newDevice = new this.deviceModel(body);
    return await newDevice.save();
  }

  async update(id: string, body: UpdateDeviceDto) {
    return await this.deviceModel.findByIdAndUpdate(id, body, { new: true });
  }

  async delete(id: string) {
    return await this.deviceModel.findByIdAndDelete(id);
  }
}
