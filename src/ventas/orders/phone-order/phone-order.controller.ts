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
import { PhoneOrderService } from './phone-order.service';
import { createPhoneDto } from 'src/dto/ventas/orders/phoneOrder/createPhoneOrder.dto';

@Controller('phone-order')
export class PhoneOrderController {
  constructor(private phoneOrderService: PhoneOrderService) {}

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: createPhoneDto) {
    try {
      const orderUpdated = await this.phoneOrderService.update(id, body);
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
  async create(@Body() body: createPhoneDto) {
    try {
      const newOrder = await this.phoneOrderService.create(body);
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
      const orderArray = await this.phoneOrderService.findAll();
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
