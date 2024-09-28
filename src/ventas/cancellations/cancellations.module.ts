import { Module } from '@nestjs/common';
import { CancellationsController } from './cancellations.controller';
import { CancellationsService } from './cancellations.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CancellationSchema,
  Cancellations,
} from 'src/schemas/ventas/cancellations.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import { BillSchema, Bills } from 'src/schemas/ventas/bills.schema';
import { NoteSchema, Notes } from 'src/schemas/ventas/notes.schema';
import { Product } from 'src/schemas/ventas/product.schema';
import { ProductSchema } from 'src/schemas/catalogo/products.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import { ProcessService } from 'src/process/process.service';
import { BillsService } from '../bills/bills.service';
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

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cancellations.name,
        schema: CancellationSchema,
      },
      {
        name: Table.name,
        schema: TableSchema,
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
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
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
    ]),
  ],
  controllers: [CancellationsController],
  providers: [
    CancellationsService,
    OperatingPeriodService,
    ProcessService,
    BillsService,
  ],
})
export class CancellationsModule {}
