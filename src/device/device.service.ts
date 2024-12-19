import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeviceDto } from 'src/dto/devices/createDeviceDto';
import { UpdateDeviceDto } from 'src/dto/devices/updateDeviceDto';
import { Branch } from 'src/schemas/business/branchSchema';
import { Device } from 'src/schemas/devices/device.schema';
import { Setting } from 'src/schemas/setting/setting.schema';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(Setting.name) private settingModel: Model<Setting>,
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
    console.log('Método update iniciado');
    console.log('ID recibido:', id);
    console.log('Body recibido:', JSON.stringify(body, null, 2));

    try {
      // Fetch device and populate settings
      const device = await this.deviceModel.findById(id).populate('settings');

      console.log('Device encontrado:', device ? 'Sí' : 'No');
      if (!device) {
        throw new Error(`Device with ID ${id} not found`);
      }

      console.log('Device completo:', JSON.stringify(device, null, 2));
      console.log('Device settings:', device.settings);

      if (
        device.settings &&
        device.settings.printers &&
        device.settings.printers.length > 0
      ) {
        console.log(
          'Entrando al bloque de actualización de settings existentes',
        );
        console.log('Impresoras actuales:', device.settings.printers);

        // Update existing settings
        const updatedSettings = await this.settingModel.findByIdAndUpdate(
          device.settings, // Usa device.settings._id en lugar de device.settings
          { printers: body.printers },
          { new: true }, // Return the updated document
        );

        console.log('Settings actualizados:', updatedSettings);

        return {
          message: 'Settings updated successfully',
          data: updatedSettings,
        };
      }

      console.log('Creando nuevos settings');

      // Create new settings if none exist
      const newSettings = await this.settingModel.create({
        printers: body.printers,
      });

      console.log('Nuevos settings creados:', newSettings);

      await this.deviceModel.findByIdAndUpdate(id, {
        $set: { settings: newSettings._id },
      });

      return { message: 'Device updated successfully', data: newSettings };
    } catch (error) {
      // Handle and log errors
      console.error(`Error updating device:`, error);
      console.error(`Mensaje de error:`, error.message);
      throw new Error('Unable to update device settings');
    }
  }

  async delete(id: string) {
    return await this.deviceModel.findByIdAndDelete(id);
  }
}
