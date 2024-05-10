import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from 'src/dto/setting/updateSettingDto';
import { CreateSettingDto } from 'src/dto/setting/createSettingDto';

@Controller('setting')
export class SettingController {
  constructor(private settingService: SettingService) {}
  @Get()
  async findAll() {
    try {
      const settingsArray = await this.settingService.findAll();
      if (!settingsArray) {
        throw new NotFoundException(
          `No se encontraron dispositivos disponibles`,
        );
      }
      return settingsArray;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado el buscar dispositivos disponibles ${error}`,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const settingSelected = await this.settingService.findOne(id);
      if (!settingSelected) {
        throw new NotFoundException(
          `El dispositivo ${id}, no se encuentra disponible o no existe`,
        );
      }
      return settingSelected;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado en la busqueda ${error}`,
      );
    }
  }

  @Post()
  async create(@Body() body: CreateSettingDto) {
    try {
      const newsetting = await this.settingService.create(body);
      return newsetting;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`Este disposito ya se encuetra listado`);
      }
      throw new NotFoundException(`Ha ocurrido algo inesperado ${error}`);
    }
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateSettingDto) {
    try {
      const settingUpdated = await this.settingService.update(id, body);
      if (!settingUpdated) {
        throw new NotFoundException(
          `El dispositivo ${id} no se encuentra disponible para actualizar o no existe`,
        );
      }
      return settingUpdated;
    } catch (error) {
      throw new NotFoundException(`Ha ocurrido algo inesperado ${error}`);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const settingDeleted = await this.settingService.delete(id);
      if (!settingDeleted) {
        throw new NotFoundException(
          `No se ha podido eliminar. El dispositivo ${id} no se encuentra disponible o no existe`,
        );
      }
      return settingDeleted;
    } catch (error) {
      throw new NotFoundException(`Ha ocurrido un error inesperado ${error}`);
    }
  }
}
