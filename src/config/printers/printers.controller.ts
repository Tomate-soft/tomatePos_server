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
import { PrintersService } from './printers.service';
import { CreatePrinterDto } from 'src/dto/configuracion/printers/createPrinterDto';
import { UpdatePrinterDto } from 'src/dto/configuracion/printers/updatePrinterDto';

@Controller('printers')
export class PrintersController {
  constructor(private printersService: PrintersService) {}

  @Get()
  async findAll() {
    try {
      const printersArray = await this.printersService.findAll();
      if (!printersArray) {
        throw new NotFoundException('No se encontraron impresoras disponibles');
      }
      return printersArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedPrinter = await this.printersService.findOne(id);
      if (!selectedPrinter) {
        throw new NotFoundException(
          `No se encuentra la impresora con el id: ${id}`,
        );
      }
      return selectedPrinter;
    } catch (error) {
      throw new NotFoundException(`Ha ocurrido algo inesperado: ${error}`);
    }
  }
  @Post()
  async create(@Body() body: CreatePrinterDto) {
    try {
      const newPrinter = await this.printersService.create(body);
      return newPrinter;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Ya existe la impresora');
      }
      throw new NotFoundException(`Ha ocurrido algo inesperado: ${error}`);
    }
  }
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const printerDeleted = await this.printersService.delete(id);
      if (!printerDeleted) {
        throw new NotFoundException(
          `No se encontro la impresora con le id: ${id}`,
        );
      }
      return printerDeleted;
    } catch (error) {
      throw new NotFoundException(`Ha ocurrido algo inesperado: ${error}`);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() Body: UpdatePrinterDto) {
    try {
      const updatedPrinter = await this.printersService.update(id, Body);
      if (!updatedPrinter) {
        throw new NotFoundException(
          `No se pudo actualizar la impresora: ${id}`,
        );
      }
      return updatedPrinter;
    } catch (error) {
      throw new NotFoundException(`Ha ocurridop alñgo inesperado, ${error}`);
    }
  }
}
