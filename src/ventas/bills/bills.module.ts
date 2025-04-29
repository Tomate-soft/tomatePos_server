import { forwardRef, Module } from '@nestjs/common';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema, Bills } from 'src/schemas/ventas/bills.schema';
import { NoteSchema, Notes } from 'src/schemas/ventas/notes.schema';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import {
  PhoneOrder,
  PhoneOrderSchema,
} from 'src/schemas/ventas/orders/phoneOrder.schema';
import {
  RappiOrder,
  RappiOrderSchema,
} from 'src/schemas/ventas/orders/rappiOrder.schema';
import {
  ToGoOrder,
  ToGoOrderSchema,
} from 'src/schemas/ventas/orders/toGoOrder.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import { ProcessModule } from 'src/process/process.module';
import { OperatingPeriodModule } from 'src/operating-period/operating-period.module';
import { User, UserSchema } from 'src/schemas/users.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import {
  SourcePeriod,
  SourcePeriodSchema,
} from 'src/schemas/SourcePeriod/sourcePeriod.schema';
import { Discount, DiscountSchema } from 'src/schemas/ventas/discounts.schema';
import { DiscountsService } from '../discounts/discounts.service';
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
        name: Bills.name,
        schema: BillSchema,
      },
      {
        name: Notes.name,
        schema: NoteSchema,
      },
      {
        name: CashierSession.name,
        schema: CashierSessionSchema,
      },
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
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
        name: Branch.name,
        schema: BranchSchema,
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
  ],
  controllers: [BillsController],
  providers: [
    BillsService,
    OperatingPeriodService,
    DiscountsService,
    CancellationsService,
  ],
  exports: [BillsService],
})
export class BillsModule {}
