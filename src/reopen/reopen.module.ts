import { Module } from '@nestjs/common';
import { ReopenController } from './reopen.controller';
import { ReopenService } from './reopen.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reopen, ReopenSchema } from 'src/schemas/reopen/reopen.schema';
import { Bills, BillSchema } from 'src/schemas/ventas/bills.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import { Notes, NoteSchema } from 'src/schemas/ventas/notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reopen.name, schema: ReopenSchema },
      { name: Bills.name, schema: BillSchema },
      { name: Notes.name, schema: NoteSchema },
      { name: Table.name, schema: TableSchema },
      { name: CashierSession.name, schema: CashierSessionSchema },
    ]),
  ],
  controllers: [ReopenController],
  providers: [ReopenService],
})
export class ReopenModule {}
