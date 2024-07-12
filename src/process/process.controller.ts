import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ProcessService } from './process.service';

@Controller('process')
export class ProcessController {
  constructor(private processService: ProcessService) {}

  @Get('total-current-bills')
  async getTotalCurrentBills() {
    try {
      const totalBillsArray = await this.processService.getTotalCurrentBills();
      if (!totalBillsArray) {
        throw new NotFoundException('No bills found');
      }
      return totalBillsArray;
    } catch (error) {
      throw new NotFoundException('No bills found');
    }
  }
}
