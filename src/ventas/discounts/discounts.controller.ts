import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from 'src/dto/ventas/discounts/createDiscountDto';
import { UpdateDiscountDto } from 'src/dto/ventas/discounts/updateDiscountsDto';

@Controller('discounts')
export class DiscountsController {
  constructor(private discountService: DiscountsService) {}

  @Get()
  async findAll() {
    try {
      const discountsArray = await this.discountService.findAll();
      if (!discountsArray) {
        throw new NotFoundException('No se encontro ningun decsuento');
      }
      return discountsArray;
    } catch (error) {
      new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedDiscount = await this.discountService.findOne(id);
      if (!selectedDiscount) {
        throw new NotFoundException('No se encontro el descuento');
      }
      return selectedDiscount;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Post()
  async create(@Body() body: CreateDiscountDto) {
    try {
      const newDiscount = await this.discountService.create(body);
      return newDiscount;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Este descuento ya se aplico anteriormente',
        );
      }
      throw new NotFoundException('NO se ha podido aplicar el descuento');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const deletedDiscount = await this.discountService.delete(id);
      if (!deletedDiscount) {
        throw new NotFoundException(
          'No se encontro el descuento que intenta eliminar',
        );
      }
      return deletedDiscount;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, body: UpdateDiscountDto) {
    try {
      const updatedDiscount = await this.discountService.update(id, body);
      if (!updatedDiscount) {
        throw new NotFoundException(
          'No se encuentra el descuento que se desea actualizar',
        );
      }
      return updatedDiscount;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }
}
