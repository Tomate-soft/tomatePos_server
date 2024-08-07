import { Controller, NotFoundException, Post } from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}
  @Post()
  async createBusiness(business: any) {
    try {
      const newBusiness = await this.businessService.createBusiness(business);
      if (!newBusiness) {
        throw new NotFoundException('Business not created');
      }
      return newBusiness;
    } catch (error) {
      throw new NotFoundException('NOP');
    }
  }
}
