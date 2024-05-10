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
import { DepartamentsService } from './departaments.service';
import { createDepartamentDto } from 'src/dto/usuarios/departaments/createDepartamentsDto';
import { updateDepartamentDto } from 'src/dto/usuarios/departaments/updateDepartamentsDto';

@Controller('departaments')
export class DepartamentsController {
  constructor(private readonly departamentService: DepartamentsService) {}

  @Get()
  async findAll() {
    try {
      const departamentsArray = await this.departamentService.findAll();
      if (!departamentsArray) {
        throw new NotFoundException(
          'No se encontraron departaments disponibles',
        );
      }
      return departamentsArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedDepartament = await this.departamentService.findOne(id);
      if (!selectedDepartament) {
        throw new NotFoundException('No se encuentra esta departament');
      }
      return selectedDepartament;
    } catch (error) {
      throw new NotFoundException(
        'No se encontro el departamento debido a un error inesperado',
      );
    }
  }

  @Post()
  async create(@Body() body: createDepartamentDto) {
    try {
      const newDepartament = await this.departamentService.create(body);
      return newDepartament;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Este departamento ya existe');
      }
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const departamentDeleted = await this.departamentService.delete(id);
      if (!departamentDeleted) {
        throw new NotFoundException('No se encontro el departamento');
      }
      return departamentDeleted;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error inesperado, no se ha podido eliminar',
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() Body: updateDepartamentDto) {
    try {
      const updatedDepartament = await this.departamentService.update(id, Body);
      if (!updatedDepartament) {
        throw new NotFoundException(
          'No se encontro el departament que deseas actualizar',
        );
      }
      return updatedDepartament;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error inepserado, no se ha podido actualizar el departamento',
      );
    }
  }
}
