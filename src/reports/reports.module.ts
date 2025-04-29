import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import { BillsService } from 'src/ventas/bills/bills.service';
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
import { Notes, NoteSchema } from 'src/schemas/ventas/notes.schema';
import { User, UserSchema } from 'src/schemas/users.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import { ProcessService } from 'src/process/process.service';
import {
  SourcePeriod,
  SourcePeriodSchema,
} from 'src/schemas/SourcePeriod/sourcePeriod.schema';
import { Discount, DiscountSchema } from 'src/schemas/ventas/discounts.schema';
import { DiscountsService } from 'src/ventas/discounts/discounts.service';
import { CancellationsService } from 'src/ventas/cancellations/cancellations.service';
import { Cancellations } from 'src/schemas/ventas/cancellations.schema';
import { CancellationReasonSchema } from 'src/schemas/ventas/cancellationReason.schema';
import { Product } from 'src/schemas/ventas/product.schema';
import { ProductSchema } from 'src/schemas/catalogo/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CashierSession.name, schema: CashierSessionSchema },
      { name: Bills.name, schema: BillSchema },
      { name: ToGoOrder.name, schema: ToGoOrderSchema },
      { name: RappiOrder.name, schema: RappiOrderSchema },
      { name: PhoneOrder.name, schema: PhoneOrderSchema },
      { name: Notes.name, schema: NoteSchema },
      { name: User.name, schema: UserSchema },
      { name: Table.name, schema: TableSchema },
      { name: OperatingPeriod.name, schema: OperatingPeriodSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: SourcePeriod.name, schema: SourcePeriodSchema },
      { name: Discount.name, schema: DiscountSchema },
      { name: Cancellations.name, schema: CancellationReasonSchema },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ReportsController],
  providers: [
    ReportsService,
    BillsService,
    OperatingPeriodService,
    ProcessService,
    DiscountsService,
    CancellationsService,
  ],
})
export class ReportsModule {}
