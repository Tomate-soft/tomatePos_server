import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SellTypesService } from './sell-types.service';
import { UpdateSellTypeDto } from 'src/dto/tiposDeVenta/updateSellType';
import { CreateSellTypeDto } from 'src/dto/tiposDeVenta/createSellType';

@Controller('sell-types')
export class SellTypesController {
  constructor(private sellTypeService: SellTypesService) {}

  @Get()
  async findAll() {
    try {
      const sellTypesArray = await this.sellTypeService.findAll();
      if (!sellTypesArray) {
        throw new NotFoundException('No existen turnos');
      }
      return sellTypesArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido al error inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedSellType = this.sellTypeService.findOne(id);
      if (!selectedSellType) {
        throw new NotFoundException('No se encuentra este turno');
      }
      return selectedSellType;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }

  @Post()
  async create(@Body() body: CreateSellTypeDto) {
    try {
      const newSellType = await this.sellTypeService.create(body);
      return newSellType;
    } catch (error) {
      if (error.code === 11000) {
        throw new NotFoundException('Ya existe este turno');
      }
      throw new NotFoundException(`Ha ocurrido un error inesperado: ${error}`);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const sellTypeDeleted = this.sellTypeService.delete(id);
      if (!sellTypeDeleted) {
        throw new NotFoundException(
          'No se ha encontrado el turno que deseas eliminar',
        );
      }
      return sellTypeDeleted;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error inesperado, no se ha podido eliminar el turno',
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateSellTypeDto) {
    try {
      const updatedSellType = this.sellTypeService.update(id, body);
      if (!updatedSellType) {
        throw new NotFoundException(
          'No se encontro el turno que deseas modificar',
        );
      }
      return updatedSellType;
    } catch (error) {
      throw new NotFoundException(
        'No se pudo actualizar el turno debido a un error inesperado',
      );
    }
  }
}
