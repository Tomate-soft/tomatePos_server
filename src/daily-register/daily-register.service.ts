import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDailyRegisterDto } from 'src/dto/dailyRegister/createDailyregister.dto';
import { DailyRegister } from 'src/schemas/dailyRegister/createDailyRegister';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class DailyRegisterService {
  constructor(
    @InjectModel(DailyRegister.name)
    private dailyRegisterModel: Model<DailyRegister>,
    @InjectModel(User.name) // Anotación separada para el modelo User
    private userModel: Model<User>,
  ) {}

  async create(body: CreateDailyRegisterDto) {
    const actuallyUser = await this.userModel
      .findOne({ employeeNumber: body.employeeNumber })
      .populate({
        path: 'dailyRegister',
      });
    if (!actuallyUser) {
      throw new NotFoundException('No se encontro el usuario');
    }
    const isAllow = actuallyUser && body.pinPos === actuallyUser.pinPos;
    if (!isAllow) {
      throw new NotFoundException('Contraseña incorrecta');
    }
    if (isAllow) {
      try {
        if (!actuallyUser.dailyRegister?.firstTime) {
          const dataDate = new Date().toTimeString();
          const dataRegister = {
            userId: actuallyUser._id,
            firstTime: dataDate,
          };
          const newRegister = new this.dailyRegisterModel(dataRegister);
          const registerEntry = await newRegister.save();
          const updateUser = await this.userModel.findByIdAndUpdate(
            actuallyUser._id,
            {
              dailyRegister: registerEntry._id,
            },
          );

          if (!updateUser) {
            throw new NotFoundException('No se pudo actualizar el usuario');
          }

          return newRegister;
        }

        if (!actuallyUser.dailyRegister.secondTime) {
          const dataDate = new Date().toTimeString();
          const dataRegister = {
            userId: actuallyUser._id,
            secondTime: dataDate,
          };
          const updatedRegister =
            await this.dailyRegisterModel.findByIdAndUpdate(
              actuallyUser.dailyRegister,
              dataRegister,
              { new: true },
            );

          return updatedRegister;
        }
        if (!actuallyUser.dailyRegister.thirdTime) {
          const dataDate = new Date().toTimeString();
          const dataRegister = {
            userId: actuallyUser._id,
            thirdTime: dataDate,
          };
          const updatedRegister =
            await this.dailyRegisterModel.findByIdAndUpdate(
              actuallyUser.dailyRegister,
              dataRegister,
              { new: true },
            );
          if (!updatedRegister) {
            throw new NotFoundException('No se pudo actualizar el registro');
          }
          return updatedRegister;
        }
        if (!actuallyUser.dailyRegister.fourthTime) {
          const dataDate = new Date().toTimeString();
          const dataRegister = {
            userId: actuallyUser._id,
            fourthTime: dataDate,
          };
          const updatedRegister =
            await this.dailyRegisterModel.findByIdAndUpdate(
              actuallyUser.dailyRegister,
              dataRegister,
              { new: true },
            );
          if (!updatedRegister) {
            throw new NotFoundException('No se pudo actualizar el registro');
          }
          return updatedRegister;
        }
        if (actuallyUser.dailyRegister.fourthTime) {
          const res = 'Registro de de dia completo';
          return res;
        }
      } catch (error) {
        throw new NotFoundException('Ha ocurrido algo inesperado');
      }
    }
  }
}
