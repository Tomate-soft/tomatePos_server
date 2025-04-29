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
  @Get('current')
  async findAllCurrent() {
    console.log('controller !!!');
    try {
      const discountsArray = await this.discountService.findCurrent();
      if (!discountsArray) {
        throw new NotFoundException('No se encontro ningun decsuento');
      }
      return discountsArray;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get('close/:id')
  async closeId(@Param('id') id: string) {
    try {
      const discountsArray = await this.discountService.findCurrent(id);

      if (!discountsArray) {
        throw new NotFoundException('No se encontro el descuento');
      }
      return discountsArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get(':id')
  /**
   * Retrieves a discount by its ID.
   *
   * @param id - The ID of the discount to retrieve.
   * @returns A Promise that resolves to the selected discount.
   * @throws NotFoundException if the discount with the specified ID is not found.
   * @throws NotFoundException if an unexpected error occurs.// component
   */
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
  /**
   * Creates a new discount.
   * @param payload - The payload containing the accountApt and body properties.
   * @returns The newly created discount.
   * @throws {ConflictException} If the discount has already been applied.
   * @throws {NotFoundException} If the discount could not be applied.
   */
  async create(@Body() payload: { accountApt: any; body: CreateDiscountDto }) {
    try {
      const newDiscount = await this.discountService.create(payload);
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
  async update(@Param('id') id: string, @Body() body: UpdateDiscountDto) {
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

  @Put('d/:id')
  async deleteDiscount(@Param('id') id: string, @Body() body: any) {
    try {
      const updatedDiscount = await this.discountService.deleteDiscounte(
        id,
        body,
      );
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

  @Put('d/note/:id')
  async deleteDiscountProductInNote(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    try {
      const updateDiscount =
        await this.discountService.deleteDiscountProductInNote(id, body);
      if (!updateDiscount) {
        throw new NotFoundException('No se puso completar');
      }
      return updateDiscount;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Put('d/bill/:id')
  async deleteDiscountProductInBill(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    try {
      const updateDiscount =
        await this.discountService.deleteDiscountProductInBill(id, body);
      if (!updateDiscount) {
        throw new NotFoundException('No se puso completar');
      }
      return updateDiscount;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }
}
