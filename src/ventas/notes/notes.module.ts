import { forwardRef, Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NoteSchema, Notes } from 'src/schemas/ventas/notes.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BillsService } from '../bills/bills.service';
import { BillSchema, Bills } from 'src/schemas/ventas/bills.schema';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import {
  ToGoOrder,
  ToGoOrderSchema,
} from 'src/schemas/ventas/orders/toGoOrder.schema';
import { TogoOrderService } from '../orders/togo-order/togo-order.service';
import {
  PhoneOrder,
  PhoneOrderSchema,
} from 'src/schemas/ventas/orders/phoneOrder.schema';
import {
  RappiOrder,
  RappiOrderSchema,
} from 'src/schemas/ventas/orders/rappiOrder.schema';
import { OperatingPeriodModule } from 'src/operating-period/operating-period.module';
import { ProcessModule } from 'src/process/process.module';
import { User, UserSchema } from 'src/schemas/users.schema';
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
        name: Notes.name,
        schema: NoteSchema,
      },
      {
        name: Bills.name,
        schema: BillSchema,
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
        name: Table.name,
        schema: TableSchema,
      },
      {
        name: Branch.name,
        schema: BranchSchema,
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
        name: User.name,
        schema: UserSchema,
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
  controllers: [NotesController],
  providers: [
    NotesService,
    BillsService,
    OperatingPeriodService,
    TogoOrderService,
    DiscountsService,
    CancellationsService,
  ],
})
export class NotesModule {}
