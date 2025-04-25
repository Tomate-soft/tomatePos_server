import { forwardRef, Module } from '@nestjs/common';
import { OperatingPeriodController } from './operating-period.controller';
import { OperatingPeriodService } from './operating-period.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import { ProcessService } from 'src/process/process.service';
import { Bills, BillSchema } from 'src/schemas/ventas/bills.schema';
import { BillsService } from 'src/ventas/bills/bills.service';
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
import { Notes, NoteSchema } from 'src/schemas/ventas/notes.schema';
import { ProcessModule } from 'src/process/process.module';
import { PaymentsModule } from 'src/ventas/payments/payments.module';
import { BillsModule } from 'src/ventas/bills/bills.module';
import { User, UserSchema } from 'src/schemas/users.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import {
  SourcePeriod,
  SourcePeriodSchema,
} from 'src/schemas/SourcePeriod/sourcePeriod.schema';
import { DiscountsService } from 'src/ventas/discounts/discounts.service';
import { Discount, DiscountSchema } from 'src/schemas/ventas/discounts.schema';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
      },
      {
        name: Branch.name,
        schema: BranchSchema,
      },
      {
        name: Bills.name,
        schema: BillSchema,
      },
      {
        name: ToGoOrder.name,
        schema: ToGoOrderSchema,
      },
      {
        name: RappiOrder.name,
        schema: RappiOrderSchema,
      },
      {
        name: PhoneOrder.name,
        schema: PhoneOrderSchema,
      },
      {
        name: Notes.name,
        schema: NoteSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Table.name,
        schema: TableSchema,
      },
      {
        name: SourcePeriod.name,
        schema: SourcePeriodSchema,
      },
      {
        name: Discount.name,
        schema: DiscountSchema,
      },
      {
        name: CashierSession.name,
        schema: CashierSessionSchema,
      },
    ]),
    forwardRef(() => ProcessModule),
    forwardRef(() => PaymentsModule),
    forwardRef(() => BillsModule),
  ],
  controllers: [OperatingPeriodController],
  providers: [
    OperatingPeriodService,
    ProcessService,
    BillsService,
    DiscountsService,
  ],
  exports: [OperatingPeriodService],
})
export class OperatingPeriodModule {}
