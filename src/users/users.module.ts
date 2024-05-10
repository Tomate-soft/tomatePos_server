import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.schema';
import { Role, RoleSchema } from 'src/schemas/role/role';
import { Profile, ProfileSchema } from 'src/schemas/usuarios/profiles.Schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import {
  DailyRegister,
  DailyRegisterSchema,
} from 'src/schemas/dailyRegister/createDailyRegister';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Profile.name,
        schema: ProfileSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
      {
        name: Table.name,
        schema: TableSchema,
      },
      {
        name: DailyRegister.name,
        schema: DailyRegisterSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
