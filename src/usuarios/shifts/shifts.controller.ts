import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { createShiftDto } from 'src/dto/usuarios/shifts/createShiftDto';
import { updateShiftDto } from 'src/dto/usuarios/shifts/updateShiftDto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftService: ShiftsService) {}
  @Get()
  async findAll() {
    try {
      const shiftsArray = await this.shiftService.findAll();
      if (!shiftsArray) {
        throw new NotFoundException('No existen turnos');
      }
      return shiftsArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido al error inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedShift = this.shiftService.findOne(id);
      if (!selectedShift) {
        throw new NotFoundException('No se encuentra este turno');
      }
      return selectedShift;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }

  @Post()
  async create(@Body() body: createShiftDto) {
    try {
      const newShift = await this.shiftService.create(body);
      return newShift;
    } catch (error) {
      if (error.code === 11000) {
        throw new NotFoundException('Ya existe este turno');
      }
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const shiftDeleted = this.shiftService.delete(id);
      if (!shiftDeleted) {
        throw new NotFoundException(
          'No se ha encontrado el turno que deseas eliminar',
        );
      }
      return shiftDeleted;
    } catch (error) {
      throw new NotFoundException(
        'Ha ocurrido un error inesperado, no se ha podido eliminar el turno',
      );
    }
  }

  @Put()
  async update(@Param('id') id: string, @Body() body: updateShiftDto) {
    try {
      const updatedShift = this.shiftService.update(id, body);
      if (!updatedShift) {
        throw new NotFoundException(
          'No se encontro el turno que deseas modificar',
        );
      }
      return updatedShift;
    } catch (error) {
      throw new NotFoundException(
        'No se pudo actualizar el turno debido a un error inesperado',
      );
    }
  }
}
