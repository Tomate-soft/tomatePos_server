import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { User, UserSchema } from 'src/schemas/users.schema';
import { BillSchema, Bills } from 'src/schemas/ventas/bills.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import { NoteSchema, Notes } from 'src/schemas/ventas/notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Bills.name,
        schema: BillSchema,
      },
      {
        name: Table.name,
        schema: TableSchema,
      },
      {
        name: Notes.name,
        schema: NoteSchema,
      },
    ]),
  ],
  providers: [CronService],
})
export class CronModule {}
