import { forwardRef, Module } from '@nestjs/common';
import { ClousuresOfOperationsController } from './clousures-of-operations.controller';
import { ClousuresOfOperationsService } from './clousures-of-operations.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import { ReportsService } from 'src/reports/reports.service';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import { Bills, BillSchema } from 'src/schemas/ventas/bills.schema';
import {
  ToGoOrder,
  ToGoOrderSchema,
} from 'src/schemas/ventas/orders/toGoOrder.schema';
import {
  RappiOrder,
  RappiOrderSchema,
} from 'src/schemas/ventas/orders/rappiOrder.schema';
import {
  PhoneOrder,
  PhoneOrderSchema,
} from 'src/schemas/ventas/orders/phoneOrder.schema';
import { ProcessModule } from 'src/process/process.module';
import { OperatingPeriodModule } from 'src/operating-period/operating-period.module';
import { BillsModule } from 'src/ventas/bills/bills.module';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/schemas/users.schema';
import {
  SourcePeriod,
  SourcePeriodSchema,
} from 'src/schemas/SourcePeriod/sourcePeriod.schema';

/**
 * Module for handling closures of operations.
 */
/**
 * Module for handling closures of operations.
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OperatingPeriod.name, schema: OperatingPeriodSchema },
      { name: CashierSession.name, schema: CashierSessionSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Bills.name, schema: BillSchema },
      { name: ToGoOrder.name, schema: ToGoOrderSchema },
      { name: RappiOrder.name, schema: RappiOrderSchema },
      { name: PhoneOrder.name, schema: PhoneOrderSchema },
      { name: User.name, schema: UserSchema },
      { name: SourcePeriod.name, schema: SourcePeriodSchema },
    ]),
    forwardRef(() => ProcessModule),
    forwardRef(() => OperatingPeriodModule),
    forwardRef(() => BillsModule),
  ],
  controllers: [ClousuresOfOperationsController],
  providers: [
    ClousuresOfOperationsService,
    ReportsService,
    OperatingPeriodService,
    UsersService,
  ],
})
export class ClousuresOfOperationsModule {}
