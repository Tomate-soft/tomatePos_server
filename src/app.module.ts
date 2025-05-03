import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './catalogo/categories/categories.module';
import { DishesModule } from './catalogo/dishes/dishes.module';
import { ProductsModule } from './catalogo/products/products.module';
import { ModificationsModule } from './catalogo/modifications/modifications.module';
import { MenusYrecetasModule } from './catalogo/menus-yrecetas/menus-yrecetas.module';
import { BillsModule } from './ventas/bills/bills.module';
import { NotesModule } from './ventas/notes/notes.module';
import { ProductModule } from './ventas/product/product.module';
import { PaymentsModule } from './ventas/payments/payments.module';
import { DiscountsModule } from './ventas/discounts/discounts.module';
import { CancellationsModule } from './ventas/cancellations/cancellations.module';
import { CancellationReasonModule } from './ventas/cancellation-reason/cancellation-reason.module';
import { ExcelModule } from './utils/chargeFiles/excel/excel/excel.module';
import { TillModule } from './caja/till/till.module';
import { ShiftsModule } from './usuarios/shifts/shifts.module';
import { DepartamentsModule } from './usuarios/departaments/departaments.module';
import { ProfilesModule } from './usuarios/profiles/profiles.module';
import { SubcategoryOneModule } from './catalogo/categories/subcategory-one/subcategory-one.module';
import { SellTypesModule } from './sell-types/sell-types.module';
import { EmployeesModule } from './usuarios/employees/employees.module';
import { XlsModule } from './exports/xls/xls.module';
import { PrintModule } from './print/print.module';
import { TablesModule } from './tables/tables.module';
import { PrintersModule } from './config/printers/printers.module';
import { MachineIdentifierModule } from './machine-identifier/machine-identifier.module';
import { DeviceModule } from './device/device.module';
import { SettingModule } from './setting/setting.module';
import { OperatingPeriodModule } from './operating-period/operating-period.module';
import { CashierSessionModule } from './cashier-session/cashier-session.module';
import { RoleModule } from './role/role.module';
import { DailyRegisterModule } from './daily-register/daily-register.module';
import { CronModule } from './cron/cron.module';
import { TogoOrderModule } from './ventas/orders/togo-order/togo-order.module';
import { ClousuresOfOperationsModule } from './clousures-of-operations/clousures-of-operations.module';
import { ReportsModule } from './reports/reports.module';
import { RappiOrderModule } from './ventas/orders/rappi-order/rappi-order.module';
import { PhoneOrderModule } from './ventas/orders/phone-order/phone-order.module';
import { ProcessModule } from './process/process.module';
import { BusinessModule } from './business/business.module';
import { ReopenModule } from './reopen/reopen.module';
import { AdditionsGroupModule } from './additions-group/additions-group.module';
import { RewritePeriodModule } from './rewrite-period/rewrite-period.module';

const uri =
  'mongodb+srv://tomatesoftadmin:Masqueunataqueria.2025@tomatesoft.mongocluster.cosmos.azure.com/dbtomatesoft?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000';
@Module({
  imports: [
    MongooseModule.forRoot(uri),
    UsersModule,
    AuthModule,
    CategoriesModule,
    DishesModule,
    ProductsModule,
    ModificationsModule,
    MenusYrecetasModule, // No se utilizó aun.
    BillsModule,
    NotesModule,
    ProductModule,
    PaymentsModule,
    DiscountsModule,
    CancellationsModule,
    CancellationReasonModule,
    ExcelModule,
    TillModule,
    ShiftsModule,
    DepartamentsModule,
    ProfilesModule,
    SubcategoryOneModule,
    SellTypesModule,
    EmployeesModule,
    XlsModule,
    PrintModule,
    TablesModule,
    PrintersModule,
    MachineIdentifierModule,
    DeviceModule,
    SettingModule,
    OperatingPeriodModule,
    CashierSessionModule,
    RoleModule,
    DailyRegisterModule,
    CronModule,
    TogoOrderModule,
    ClousuresOfOperationsModule,
    ReportsModule,
    RappiOrderModule,
    PhoneOrderModule,
    ProcessModule,
    BusinessModule,
    ReopenModule,
    AdditionsGroupModule,
    RewritePeriodModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'USE_VALUE',
      useValue: process.env.USE_VALUE === 'PROD' ? 'PROD' : 'DEV',
    },
  ],
})
export class AppModule {}
