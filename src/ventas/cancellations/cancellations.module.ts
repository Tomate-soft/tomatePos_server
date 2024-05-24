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
    ]),
  ],
  controllers: [CancellationsController],
  providers: [CancellationsService],
})
export class CancellationsModule {}
