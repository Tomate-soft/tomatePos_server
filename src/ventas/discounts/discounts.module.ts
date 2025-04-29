import { forwardRef, Module } from '@nestjs/common';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Discount, DiscountSchema } from 'src/schemas/ventas/discounts.schema';
import { BillSchema, Bills } from 'src/schemas/ventas/bills.schema';
import { NoteSchema, Notes } from 'src/schemas/ventas/notes.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import { ProcessModule } from 'src/process/process.module';
import { OperatingPeriodModule } from 'src/operating-period/operating-period.module';
import { BillsModule } from '../bills/bills.module';
import {
  SourcePeriod,
  SourcePeriodSchema,
} from 'src/schemas/SourcePeriod/sourcePeriod.schema';
import { CancellationsService } from '../cancellations/cancellations.service';
import {
  Cancellations,
  CancellationSchema,
} from 'src/schemas/ventas/cancellations.schema';
import { Product } from 'src/schemas/ventas/product.schema';
import { ProductSchema } from 'src/schemas/catalogo/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
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
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
      },
      {
        name: CashierSession.name,
        schema: CashierSessionSchema,
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
        name: Cancellations.name,
        schema: CancellationSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    forwardRef(() => ProcessModule),
    forwardRef(() => OperatingPeriodModule),
    forwardRef(() => BillsModule),
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService, OperatingPeriodService, CancellationsService],
})
export class DiscountsModule {}
