import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeviceDto } from 'src/dto/devices/createDeviceDto';
import { UpdateDeviceDto } from 'src/dto/devices/updateDeviceDto';
import { Branch } from 'src/schemas/business/branchSchema';
import { Device } from 'src/schemas/devices/device.schema';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
  ) {}
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

  async create(body: CreateDeviceDto, branchId: string) {
    const session = await this.deviceModel.startSession();
    session.startTransaction();
    const newDevice = new this.deviceModel(body);
    if (!newDevice) {
      await session.abortTransaction();
      session.endSession();
      throw new Error('Device not created');
    }
    await newDevice.save();
    const branch = await this.branchModel.findByIdAndUpdate(branchId, {
      $push: { devices: newDevice._id },
    });
    await session.commitTransaction();
    session.endSession();
    return newDevice;
  }

  async update(id: string, body: UpdateDeviceDto) {
    return await this.deviceModel.findByIdAndUpdate(id, body, { new: true });
  }

  async delete(id: string) {
    return await this.deviceModel.findByIdAndDelete(id);
  }
}
