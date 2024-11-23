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
import { DailyRegisterService } from './daily-register.service';
import { CreateDailyRegisterDto } from 'src/dto/dailyRegister/createDailyregister.dto';
import { UpdateDailyRegisterDto } from 'src/dto/dailyRegister/updateDailyRegister.dto';

@Controller('daily-register')
export class DailyRegisterController {
  constructor(private dailyRegisterService: DailyRegisterService) {}

  @Post()
  async create(@Body() body: CreateDailyRegisterDto) {
    try {
      const newRegister = await this.dailyRegisterService.create(body);
      return newRegister;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `No se pudo completar el registro ${error}`,
        );
      }
      throw new NotFoundException(`Ha ocurrido algo inesperado ${error}`);
    }
  }

  @Get()
  async getAll() {
    try {
      const allRegister = await this.dailyRegisterService.getAll();
      return allRegister;
    } catch (error) {
      throw new NotFoundException(`Ha ocurrido algo inesperado ${error}`);
    }
  }

  @Put(':id')
  async updateRegister(
    @Param('id') id: string,
    @Body() body: UpdateDailyRegisterDto,
  ) {
    try {
      const updateRegister = await this.dailyRegisterService.updateRegister(
        id,
        body,
      );
      return updateRegister;
    } catch (error) {
      throw new NotFoundException(`Ha ocurrido algo inesperado ${error}`);
    }
  }
}
