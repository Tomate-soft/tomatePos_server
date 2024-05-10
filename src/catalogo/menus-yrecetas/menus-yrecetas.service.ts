import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createMenusYRecetasDto } from 'src/dto/catalogo/menusYRecetas/createMenusYRecetasDto';
import { updateMenusYRecetasDto } from 'src/dto/catalogo/menusYRecetas/updatedMenusYRecetasDto';
import { MenusYRecetas } from 'src/schemas/catalogo/menusYRecetas.schema';

@Injectable()
export class MenusYrecetasService {
  constructor(
    @InjectModel(MenusYRecetas.name)
    private menusYRecetasModel: Model<MenusYRecetas>,
  ) {}

  async findAll() {
    return await this.menusYRecetasModel.find();
  }

  async findOne(id: string) {
    return this.menusYRecetasModel.findById(id);
  }

  async create(createdMenu: createMenusYRecetasDto) {
    const menuCreated = new this.menusYRecetasModel(createdMenu);
    return await menuCreated.save();
  }

  async delete(id: string) {
    return await this.menusYRecetasModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedMenu: updateMenusYRecetasDto) {
    return await this.menusYRecetasModel.findByIdAndUpdate(id, updatedMenu, {
      new: true,
    });
  }
}
