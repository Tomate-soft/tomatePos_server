import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';

// interfaces
import { CreateUserDto } from 'src/dto/users/createUser.dto';
import { UpdateUserDto } from 'src/dto/users/updateUserDto';
import { Bills } from 'src/schemas/ventas/bills.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async findAll() {
    return await this.UserModel.find()
      .populate({
        path: 'role',
        populate: [
          {
            path: 'departament',
          },
          {
            path: 'role',
          },
        ],
      })
      .populate({
        path: 'tables',
      })
      .populate({
        path: 'dailyRegister',
      });
  }

  async findByEmail(email: string) {
    return await this.UserModel.findOne({ email })
      .populate({
        path: 'role',
        populate: [
          {
            path: 'departament',
          },
          {
            path: 'role',
          },
        ],
      })
      .populate({
        path: 'tables',
      });
  }

  async findByEmployeeNumber(employeeNumber: number) {
    return await this.UserModel.findOne({ employeeNumber })
      .populate({
        path: 'role',
        populate: [
          {
            path: 'departament',
          },
          {
            path: 'role',
          },
        ],
      })
      .populate({
        path: 'tables',
        populate: [
          {
            path: 'bill',
            populate: [
              {
                path: 'notes',
              },
            ],
          },
        ],
      })
      .populate({ path: 'cashierSession', populate: [{ path: 'bills' }] });
  }

  async create(createUser: CreateUserDto) {
    console.log(createUser);
    try {
      const lastUser = await this.UserModel.findOne({})
        .sort({ employeeNumber: -1 })
        .exec();

      const nextEmployeeNumber =
        !lastUser || lastUser.employeeNumber.toString().startsWith('10')
          ? 2001
          : lastUser.employeeNumber === 8099
            ? 8200
            : this.getNextEmployeeNumberCode(lastUser.employeeNumber);

      const userToCreate = new this.UserModel({
        ...createUser,
        employeeNumber: createUser.employeeNumber
          ? createUser.employeeNumber
          : nextEmployeeNumber,
      });
      await userToCreate.save();
      return userToCreate;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async updateSamples(id: string, body: UpdateUserDto) {
    // const sampleByte = base64.decode(body.samples); //
    console.log(body.samples);

    const updatedUser = await this.UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updatedUser;
  }

  async update(id: any, body: any) {
    return this.UserModel.findByIdAndUpdate(id, body, { new: true });
  }

  async cleanTables() {
    return await this.UserModel.updateMany({}, { $set: { tables: [] } });
  }
  async resetDailyRegister() {
    return await this.UserModel.updateMany(
      {},
      { $set: { dailyRegister: null } },
    );
  }

  private getNextEmployeeNumberCode(lastNumber: number): number {
    return lastNumber + 1;
  }
}
