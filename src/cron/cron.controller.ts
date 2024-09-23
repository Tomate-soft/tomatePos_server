import { Controller, Get, NotFoundException } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('cron')
export class CronController {
  constructor(private readonlycronService: CronService) {}

  @Get('test')
  async test() {
    try {
      const res = await this.readonlycronService.initializeCronJobs();
      return res;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }
}
