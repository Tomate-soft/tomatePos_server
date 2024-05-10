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
import { TillService } from './till.service';
import { CreateTillDto } from 'src/dto/caja/createTillDto';
import { UpdateTillDto } from 'src/dto/caja/updateTillDto';

@Controller('till')
export class TillController {
  constructor(private readonly tillService: TillService) {}

  @Get()
  async findAll() {
    try {
      const tillArray = await this.tillService.findAll();
      if (!tillArray) {
        throw new NotFoundException('No se encontro ninguna cuenta');
      }
      return tillArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido malñgo inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const tillSelected = await this.tillService.findOne(id);
      if (!tillSelected) {
        throw new NotFoundException('Esta cuenta no existe');
      }
      return tillSelected;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido algo inesperado al buscar esta cuenta',
      );
    }
  }

  @Post()
  async create(@Body() body: CreateTillDto) {
    try {
      const newtill = await this.tillService.create(body);
      return newtill;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Ya existe esta cuenta');
      }
      throw new NotFoundException('Hubo un error al crear la cuenta');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const tillDeleted = this.tillService.delete(id);
      if (!tillDeleted) {
        throw new NotFoundException('No existe la cuenta');
      }
      return tillDeleted;
    } catch (error) {
      throw new NotFoundException(
        'No se pudo eliminar debido a un error inesperado',
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTillDto) {
    try {
      const tillUpdate = await this.tillService.update(id, body);
      if (!tillUpdate) {
        throw new NotFoundException('No se pudo actualizar');
      }
      return tillUpdate;
    } catch (error) {
      throw new NotFoundException(
        'No se ha podido actualizar debido a un error inesperado',
      );
    }
  }
}
