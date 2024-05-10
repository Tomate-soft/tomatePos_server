import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  Body,
  ConflictException,
} from '@nestjs/common';
import { CancellationReasonService } from './cancellation-reason.service';
import { CreateCancellationReasonDto } from 'src/dto/ventas/cancellationReasons/createCancellationReasonDto';
import { UpdateCancellationReasonDto } from 'src/dto/ventas/cancellationReasons/updateCancellationReasonDto';

@Controller('cancellation-reason')
export class CancellationReasonController {
  constructor(private cancellationReasonService: CancellationReasonService) {}

  @Get()
  async findAll() {
    try {
      const reasonsAray = await this.cancellationReasonService.findAll();
      if (!reasonsAray) {
        throw new NotFoundException('No se encontraron motivos disponibles');
      }
      return reasonsAray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedReason = await this.cancellationReasonService.findOne(id);
      if (!selectedReason) {
        throw new NotFoundException('No existen el motivo indicado');
      }
      return selectedReason;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }
  @Post()
  async create(@Body() body: CreateCancellationReasonDto) {
    try {
      const newReason = await this.cancellationReasonService.create(body);
      return newReason;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Ya existe este motivo');
      }
      throw new NotFoundException('No ha sido posible crear el motivo');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const deletedReason = await this.cancellationReasonService.delete(id);
      if (!deletedReason) {
        throw new NotFoundException(
          'No se encontro el motivo que deseas eliminar',
        );
      }
      return deletedReason;
    } catch (error) {
      throw new NotFoundException('No se ha podido eliminar el motivo');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCancellationReasonDto,
  ) {
    try {
      const updatedReason = await this.cancellationReasonService.update(
        id,
        body,
      );
      if (!updatedReason) {
        throw new NotFoundException('No se encontro el motivo a actualizar');
      }
      return updatedReason;
    } catch (error) {
      throw new NotFoundException(
        'No se pudo actualizar, debido a un error inesperado',
      );
    }
  }
}
