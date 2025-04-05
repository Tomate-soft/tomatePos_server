import { Module } from '@nestjs/common';
import { DailyRegisterService } from './daily-register.service';
import { DailyRegisterController } from './daily-register.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DailyRegister,
  DailyRegisterSchema,
} from 'src/schemas/dailyRegister/createDailyRegister';
import { User, UserSchema } from 'src/schemas/users.schema';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import { ProcessService } from 'src/process/process.service';
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
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DailyRegister.name,
        schema: DailyRegisterSchema,
      },
      {
        name: Branch.name,
        schema: BranchSchema,
      },
      {
        name: Bills.name,
        schema: BillSchema,
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
        name: Notes.name,
        schema: NoteSchema,
      },
      {
        name: ToGoOrder.name,
        schema: ToGoOrderSchema,
      },
      {
        name: Table.name,
        schema: TableSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
      },
    ]),
  ],
  providers: [
    DailyRegisterService,
    OperatingPeriodService,
    ProcessService,
    BillsService,
  ],
  controllers: [DailyRegisterController],
})
export class DailyRegisterModule {}
