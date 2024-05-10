import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { DailyRegisterService } from './daily-register.service';
import { CreateDailyRegisterDto } from 'src/dto/dailyRegister/createDailyregister.dto';

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
}
