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
import { BillsService } from './bills.service';
import { CreateBillDto } from 'src/dto/ventas/bills/createBill.Dto';
import { UpdateBillDto } from 'src/dto/ventas/bills/updateBill.Dto';

@Controller('bills')
export class BillsController {
  constructor(private billService: BillsService) {}

  @Get()
  async findAll() {
    try {
      const BillsArray = await this.billService.findAll();
      if (!BillsArray) {
        throw new NotFoundException('No se encuentran cuentas activas');
      }
      return BillsArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedAccount = await this.billService.findOne(id);
      if (!selectedAccount) {
        throw new NotFoundException('No se ha encontrado la cuenta');
      }
      return selectedAccount;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }
  @Post()
  async create(@Body() body: CreateBillDto) {
    console.log(body);
    try {
      const newBill = await this.billService.create(body);
      return newBill;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Esta cuenta ya existe');
      }
      throw new NotFoundException('Ha ocurrido algop inesperado');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const deletedBill = await this.billService.delete(id);
      if (!deletedBill) {
        throw new NotFoundException('Esta cuenta no existe');
      }
      return deletedBill;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Put(':id')
  async update(@Body() body: UpdateBillDto, @Param('id') id: string) {
    console.log(body);
    const currentBill = await this.billService.findOne(id);
    const newHistory = body.transferHistory;
    const updateValue =
      newHistory && currentBill.transferHistory.length > 0
        ? [...currentBill.transferHistory, newHistory[0]]
        : undefined;
    const data = updateValue ? { ...body, transferHistory: updateValue } : body;
    try {
      const updatedBill = await this.billService.update(id, data);
      if (!updatedBill) {
        throw new NotFoundException('No se encuentra esta cuenta');
      }
      return updatedBill;
    } catch (error) {
      throw new NotFoundException(`Ha ocurrido algo inesperado: ${error}`);
    }
  }
}
