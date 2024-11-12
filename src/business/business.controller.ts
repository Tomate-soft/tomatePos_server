import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}
  @Post()
  async createBusiness(@Body() business: any) {
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

  @Get(':key')
  async getBusinesses(@Param('key') key: string) {
    try {
      const businesses = await this.businessService.getBusinesses(key);
      if (!businesses) {
        throw new NotFoundException('Businesses not found');
      }
      return businesses;
    } catch (error) {
      throw new NotFoundException('NOP');
    }
  }

  @Post('branch')
  async createBranch(@Body() branch: any) {
    try {
      const newBranch = await this.businessService.createBranch(branch);
      if (!newBranch) {
        throw new NotFoundException('Branch not created');
      }
      return newBranch;
    } catch (error) {
      throw new NotFoundException('NOP');
    }
  }

  @Post('licenseKey')
  async createLicenseKey(@Body() bussinesId: { bussinesId: string }) {
    try {
      const newLicenseKey =
        await this.businessService.createLicenseKey(bussinesId);
      if (!newLicenseKey) {
        throw new NotFoundException('LicenseKey not created');
      }
      return newLicenseKey;
    } catch (error) {
      throw new NotFoundException('NOP');
    }
  }
}
