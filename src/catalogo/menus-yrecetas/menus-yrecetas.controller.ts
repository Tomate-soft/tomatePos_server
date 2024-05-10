import {
  Body,
  NotFoundException,
  Controller,
  Get,
  Param,
  Post,
  ConflictException,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { MenusYrecetasService } from './menus-yrecetas.service';
import { createMenusYRecetasDto } from 'src/dto/catalogo/menusYRecetas/createMenusYRecetasDto';
import { throwError } from 'rxjs';
import { updateMenusYRecetasDto } from 'src/dto/catalogo/menusYRecetas/updatedMenusYRecetasDto';

@Controller('menus-yrecetas')
export class MenusYrecetasController {
  constructor(private menusYRecetasService: MenusYrecetasService) {}

  @Get()
  async findAll() {
    try {
      const menusArray = await this.menusYRecetasService.findAll();
      if (!menusArray) {
        throw new NotFoundException('No se encontraron menus y/o recetas');
      }
      return menusArray;
    } catch (error) {
      throw new NotFoundException('Ocurrio algo inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedMenu = await this.menusYRecetasService.findOne(id);
      if (!selectedMenu) {
        throw new NotFoundException('No se encuentra el menu y/o receta');
      }
      return selectedMenu;
    } catch (error) {
      throw new NotFoundException('Ocurrio algo inesperado');
    }
  }

  @Post()
  async create(@Body() body: createMenusYRecetasDto) {
    try {
      const createdMenu = await this.menusYRecetasService.create(body);
      return createdMenu;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Este menu y/o ya existe');
      }
      throw new NotFoundException('Ocurrio algo inesperado');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const deletedMenu = await this.menusYRecetasService.delete(id);
      if (!deletedMenu) {
        throw new NotFoundException('No existe el menu');
      }
      return deletedMenu;
    } catch (error) {
      throw new NotFoundException('Ocurrio algo inesperado');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: updateMenusYRecetasDto) {
    try {
      const updatedMenu = this.menusYRecetasService.update(id, body);
      if (!updatedMenu) {
        throw new NotFoundException('No se ha encontrado el Menu');
      }
      return updatedMenu;
    } catch (error) {
      throw new NotFoundException('Ocurrio algo inesperado');
    }
  }
}
