import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TogoOrderService } from './togo-order.service';
import { createToGoOrderDto } from 'src/dto/ventas/orders/createToGoOrder.dto';
import { updateToGoOrderDto } from 'src/dto/ventas/orders/updateToGoOrder.dto';

@Controller('togo-order')
export class TogoOrderController {
  constructor(private togoOrderService: TogoOrderService) {}

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: updateToGoOrderDto) {
    try {
      const orderUpdated = await this.togoOrderService.update(id, body);
      if (!orderUpdated) {
        throw new NotFoundException(`No se pudo actualizar la cuenta`);
      }
      return orderUpdated;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Post()
  async create(@Body() body: createToGoOrderDto) {
    try {
      const newOrder = await this.togoOrderService.create(body);
      return newOrder;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`Ya existe esta orden`);
      }
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, mas informacion: ${error}`,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const orderArray = await this.togoOrderService.findAll();
      if (!orderArray) {
        throw new NotFoundException(`No encontraron ordenes`);
      }
      return orderArray;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado. Mas informacion: ${error}`,
      );
    }
  }
}
