import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDailyRegisterDto } from 'src/dto/dailyRegister/createDailyregister.dto';
import { UpdateDailyRegisterDto } from 'src/dto/dailyRegister/updateDailyRegister.dto';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { DailyRegister } from 'src/schemas/dailyRegister/createDailyRegister';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class DailyRegisterService {
  constructor(
    @InjectModel(DailyRegister.name)
    private dailyRegisterModel: Model<DailyRegister>,
    @InjectModel(User.name) // Anotación separada para el modelo User
    private userModel: Model<User>,
    private operatingPeriodService: OperatingPeriodService,
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
          const currentPeriod = await this.operatingPeriodService.getCurrent(); // encontramos el periodo actual

          const dataRegister = {
            userId: actuallyUser._id,
            firstTime: body.registerInput,
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
          await this.operatingPeriodService.patchPeriod(
            currentPeriod[0]._id.toString(),
            {
              dailyRegister: [
                ...currentPeriod[0].dailyRegisters,
                registerEntry._id,
              ],
            },
          );
          return {
            username: `${actuallyUser.name} ${actuallyUser.lastName}`,
            registerData: registerEntry,
          };
        }

        if (!actuallyUser.dailyRegister.secondTime) {
          const dataDate = body.registerInput;
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

          return {
            username: `${actuallyUser.name} ${actuallyUser.lastName}`,
            registerData: updatedRegister,
          };
        }
        if (!actuallyUser.dailyRegister.thirdTime) {
          const dataDate = body.registerInput;
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
          return {
            username: `${actuallyUser.name} ${actuallyUser.lastName}`,
            registerData: updatedRegister,
          };
        }
        if (!actuallyUser.dailyRegister.fourthTime) {
          const dataDate = body.registerInput;
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
          return {
            username: `${actuallyUser.name} ${actuallyUser.lastName}`,
            registerData: updatedRegister,
          };
        }
        if (actuallyUser.dailyRegister.fourthTime) {
          const res = {
            username: `${actuallyUser.name} ${actuallyUser.lastName}`,
            registerData: actuallyUser.dailyRegister,
          };
          return res;
        }
      } catch (error) {
        throw new NotFoundException('Ha ocurrido algo inesperado');
      }
    }
  }

  async updateRegister(id: string, update: UpdateDailyRegisterDto) {
    const session = await this.dailyRegisterModel.startSession();
    const updateRegister = await session.withTransaction(async () => {
      const updateRegister = await this.dailyRegisterModel.findByIdAndUpdate(
        id,
        update,
        { new: true },
      );
      return updateRegister;
    });
    await session.commitTransaction();
    return updateRegister;
  }

  async getAll() {
    try {
      const allRegister = await this.dailyRegisterModel.find().populate({
        path: 'userId',
      });
      return allRegister;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }
}
