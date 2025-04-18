import { forwardRef, Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bills, BillSchema } from 'src/schemas/ventas/bills.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import { BillsService } from 'src/ventas/bills/bills.service';
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
import { BillsModule } from 'src/ventas/bills/bills.module';
import { OperatingPeriodModule } from 'src/operating-period/operating-period.module';
import { User, UserSchema } from 'src/schemas/users.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import {
  SourcePeriod,
  SourcePeriodSchema,
} from 'src/schemas/SourcePeriod/sourcePeriod.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bills.name, schema: BillSchema },
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
      {
        name: Notes.name,
        schema: NoteSchema,
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
    ]),
    forwardRef(() => BillsModule),
    forwardRef(() => OperatingPeriodModule),
  ],
  controllers: [ProcessController],
  providers: [ProcessService, OperatingPeriodService, BillsService],
  exports: [ProcessService],
})
export class ProcessModule {}
