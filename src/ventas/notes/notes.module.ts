import { Module } from '@nestjs/common';
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
    ]),
  ],
  controllers: [NotesController],
  providers: [NotesService, BillsService, OperatingPeriodService],
})
export class NotesModule {}
