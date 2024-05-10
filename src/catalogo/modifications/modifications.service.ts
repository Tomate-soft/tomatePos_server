import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createModifierDto } from 'src/dto/catalogo/modifiers/createModifierDto';
import { updateModifierDto } from 'src/dto/catalogo/modifiers/updateModifierDto';
import { Modifier } from 'src/schemas/catalogo/modifiers.Schema';
import { DeleteResult } from 'mongodb';

@Injectable()
export class ModificationsService {
  constructor(
    @InjectModel(Modifier.name) private modifierModel: Model<Modifier>,
  ) {}

  async findAll() {
    return await this.modifierModel.find();
  }

  async findOne(id: string) {
    return await this.modifierModel.findById(id);
  }

  async create(createModifier: createModifierDto) {
    const newModifier = new this.modifierModel(createModifier);
    return await newModifier.save();
  }
  async delete(id: string) {
    return await this.modifierModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedModifier: updateModifierDto) {
    return await this.modifierModel.findByIdAndUpdate(id, updatedModifier, {
      new: true,
    });
  }
  async replace(): Promise<DeleteResult> {
    return await this.modifierModel.deleteMany({}).exec();
  }
}
