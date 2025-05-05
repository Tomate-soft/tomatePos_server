import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { RewritePeriodService } from './rewrite-period.service';

@Controller('rewrite-period')
export class RewritePeriodController {
  constructor(private readonly rewritePeriodService: RewritePeriodService) {}

  @Post()
  async rewritePeriod(@Body() body: any) {
    try {
      const rewritePeriod =
        await this.rewritePeriodService.createRewritePeriod(body);

      if (!rewritePeriod) {
        throw new Error('No se pudo crear el periodo');
      }
      console.log('Todo chido');
      return rewritePeriod;
    } catch (error) {
      throw new NotFoundException('No se pudo crear el periodo');
    }
  }

  @Get()
  async findAll() {
    try {
      const rewritePeriod = await this.rewritePeriodService.findAll();

      if (!rewritePeriod) {
        throw new Error('No se pudo crear el periodo');
      }
      console.log('Todo chido');
      return rewritePeriod;
    } catch (error) {
      throw new NotFoundException('No se pudo crear el periodo');
    }
  }
}
