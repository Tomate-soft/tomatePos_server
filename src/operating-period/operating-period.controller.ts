import { Controller, Get, NotFoundException } from '@nestjs/common';
import { OperatingPeriodService } from './operating-period.service';

@Controller('operating-period')
export class OperatingPeriodController {
  constructor(private operatingPeriodService: OperatingPeriodService) {}

  @Get()
  async findAll() {
    try {
      const periodArray = await this.operatingPeriodService.findAll();
      if (!periodArray) {
        throw new NotFoundException(
          'No se encontro ningun periodo actualmente',
        );
      }
      return periodArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get('/current')
  async current() {
    try {
      const currenPeriod = await this.operatingPeriodService.getCurrent();
      if (!currenPeriod) {
        throw new NotFoundException('No se han iniciado operaciones');
      }
      return currenPeriod;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }
}
