import { forwardRef, Module } from '@nestjs/common';
import { CashierSessionController } from './cashier-session.controller';
import { CashierSessionService } from './cashier-session.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { User, UserSchema } from 'src/schemas/users.schema';
import CashWithdrawSchema, {
  CashWithdraw,
} from 'src/schemas/cashierSession/cashWithdraw';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import { ProcessModule } from 'src/process/process.module';
import { OperatingPeriodModule } from 'src/operating-period/operating-period.module';
import { BillsModule } from 'src/ventas/bills/bills.module';
import {
  SourcePeriod,
  SourcePeriodSchema,
} from 'src/schemas/SourcePeriod/sourcePeriod.schema';
import { DiscountsService } from 'src/ventas/discounts/discounts.service';
import { Discount, DiscountSchema } from 'src/schemas/ventas/discounts.schema';
import { Bills, BillSchema } from 'src/schemas/ventas/bills.schema';
import { Notes, NoteSchema } from 'src/schemas/ventas/notes.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CashierSession.name,
        schema: CashierSessionSchema,
      },
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: CashWithdraw.name,
        schema: CashWithdrawSchema,
      },
      {
        name: Branch.name,
        schema: BranchSchema,
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
        name: Bills.name,
        schema: BillSchema,
      },
      {
        name: Notes.name,
        schema: NoteSchema,
      },
      {
        name: Table.name,
        schema: TableSchema,
      },
    ]),
    forwardRef(() => ProcessModule),
    forwardRef(() => OperatingPeriodModule),
    forwardRef(() => BillsModule),
  ],
  controllers: [CashierSessionController],
  providers: [CashierSessionService, OperatingPeriodService, DiscountsService],
})
export class CashierSessionModule {}
