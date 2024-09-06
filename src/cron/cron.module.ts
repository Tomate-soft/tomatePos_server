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
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
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
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';

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
  providers: [CronService, OperatingPeriodService],
})
export class CronModule {}
