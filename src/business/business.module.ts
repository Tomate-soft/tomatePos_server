import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from 'src/schemas/business/businessSchema';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import {
  LicenseKey,
  licenseKeySchema,
} from 'src/schemas/business/licenseKeySchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Business.name,
        schema: BusinessSchema,
      },
      {
        name: Branch.name,
        schema: BranchSchema,
      },
      {
        name: LicenseKey.name,
        schema: licenseKeySchema,
      },
    ]),
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
