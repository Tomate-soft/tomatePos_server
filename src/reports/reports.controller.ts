import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('print-shift-register')
  async printShiftRegister(body: any) {
    try {
      const result = await this.reportsService.printShift(body);
      if (!result) {
        throw new NotFoundException('No se ha podido imprimir el reporte');
      }
      return result;
    } catch (error) {
      throw new NotFoundException('No se ha podido imprimir el reporte');
    }
  }

  @Post('moje-report')
  async printMojeReport(@Body() body: any) {
    try {
      console.log('body', body);
      const result = await this.reportsService.printMojeReport(body);
      if (!result) {
        throw new NotFoundException('No se ha podido imprimir el reporte');
      }
      return result;
    } catch (error) {
      throw new NotFoundException('No se ha podido imprimir el reporte');
    }
  }

  @Get('closed-bills-report')
  async printClosedBillsReport(@Body() body: any) {
    try {
      console.log('body', body);
      const result = await this.reportsService.printClosedBillsReport(body);
      if (!result) {
        throw new NotFoundException('No se ha podido imprimir el reporte');
      }
      return result;
    } catch (error) {
      throw new NotFoundException('No se ha podido imprimir el reporte');
    }
  }

  @Post('worked-time-report')
  async printWorkedTimeReport(@Body() body: any) {
    try {
      const result = await this.reportsService.printWorkedTimeReport(body);
      if (!result) {
        throw new NotFoundException('No se ha podido imprimir el reporte');
      }
      return result;
    } catch (error) {
      throw new NotFoundException('No se ha podido imprimir el reporte');
    }
  }
}
