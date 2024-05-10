import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { CancellationsService } from './cancellations.service';
import { CreateCancellationDto } from 'src/dto/ventas/cancellations/createCancellationDto';
import { UpdateCancellationDto } from 'src/dto/ventas/cancellations/updateCancellationDto';

@Controller('cancellations')
export class CancellationsController {
  constructor(private cancellationService: CancellationsService) {}

  @Get()
  async findAll() {
    try {
      const cancellationsArray = await this.cancellationService.findAll();
      if (!cancellationsArray) {
        throw new NotFoundException('No hay cancelationes para mostrar');
      }
      return cancellationsArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedCancellation = await this.cancellationService.findOne(id);
      if (!selectedCancellation) {
        throw new NotFoundException(
          'No se encontro la cancelation de esta venta',
        );
      }
      return selectedCancellation;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Post()
  async create(@Body() body: CreateCancellationDto) {
    try {
      const newCancellation = await this.cancellationService.create(body);
      return newCancellation;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Esta nota ya fue cancelada');
      }
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const deletedCancellation = await this.cancellationService.delete(id);
      if (!deletedCancellation) {
        throw new NotFoundException(
          'No se puso eliminar esta nota por que no existe',
        );
      }
      return deletedCancellation;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCancellationDto) {
    try {
      const updatedCancellation = await this.cancellationService.update(
        id,
        body,
      );
      if (!updatedCancellation) {
        throw new NotFoundException('No se ha encontrado la venta a cancelar');
      }
      return updatedCancellation;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }
}
