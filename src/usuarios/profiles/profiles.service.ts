import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createProfileDto } from 'src/dto/usuarios/profiles/createProfileDto';
import { updateProfileDto } from 'src/dto/usuarios/profiles/updateProfileDto';
import { Profile } from 'src/schemas/usuarios/profiles.Schema';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  async findAll() {
    return await this.profileModel.find().populate({ path: 'role' }).exec();
  }

  async findOne(id: string) {
    return await this.profileModel.findById(id);
  }

  async create(body: createProfileDto) {
    try {
      const lastProfile = await this.profileModel
        .findOne({})
        .sort({ createdAt: -1 })
        .exec();

      const nextCode = lastProfile ? this.getNextBillCode(lastProfile.code) : 1;
      const profileToCreate = new this.profileModel({
        ...body,
        code: nextCode,
      });
      await profileToCreate.save();
      return profileToCreate;
    } catch (error) {
      throw new Error(`Ocurrio algo inesperado ${error}`);
    }
  }

  async delete(id: string) {
    return await this.profileModel.findByIdAndDelete(id);
  }

  async update(id: string, body: updateProfileDto) {
    return await this.profileModel.findByIdAndUpdate(id, body, { new: true });
  }

  private getNextBillCode(lastBillCode: number): number {
    return lastBillCode + 1;
  }
}
// updated
