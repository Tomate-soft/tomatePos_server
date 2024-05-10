import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createDepartamentDto } from 'src/dto/usuarios/departaments/createDepartamentsDto';
import { updateDepartamentDto } from 'src/dto/usuarios/departaments/updateDepartamentsDto';
import { Departament } from 'src/schemas/usuarios/departaments.Schema';

@Injectable()
export class DepartamentsService {
  constructor(
    @InjectModel(Departament.name) private departamentModel: Model<Departament>,
  ) {}

  async findAll() {
    return await this.departamentModel.find();
  }

  async findOne(id: string) {
    return await this.departamentModel.findById(id);
  }

  async create(body: createDepartamentDto) {
    try {
      const lastDepartament = await this.departamentModel
        .findOne({})
        .sort({ createdAt: -1 })
        .exec();

      const nextCode = lastDepartament
        ? this.getNextBillCode(lastDepartament.code)
        : 1;

      const departamentToCreate = new this.departamentModel({
        ...body,
        code: nextCode,
      });

      await departamentToCreate.save();
      return departamentToCreate;
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id: string) {
    return await this.departamentModel.findByIdAndDelete(id);
  }

  async update(id: string, body: updateDepartamentDto) {
    return await this.departamentModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  private getNextBillCode(lastBillCode: number): number {
    return lastBillCode + 1;
  }
}
