import { Schema, Prop, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { Role } from './role/role';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Profile } from './usuarios/profiles.Schema';
import { Table } from './tables/tableSchema';
import { DailyRegister } from './dailyRegister/createDailyRegister';
import { CashierSession } from './cashierSession/cashierSession';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  lastName: string;

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
  })
  password: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Profile',
  })
  role?: Profile;

  @Prop({
    default: true,
  })
  active?: boolean;

  @Prop({
    trim: true,
  })
  employeeNumber?: number;

  @Prop({
    trim: true,
  })
  pinPos: number;

  @Prop({
    trim: true,
  })
  shift: string;

  @Prop({
    trim: true,
  })
  entryDate: string;

  @Prop({
    trim: true,
  })
  color: string;

  @Prop({
    required: false,
    default: [],
  })
  samples?: string[];

  @Prop({
    default: true,
  })
  pos: boolean;

  @Prop({
    default: false,
  })
  admin: boolean;

  @Prop({
    default: false,
  })
  authorizations: boolean;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Table' }],
    default: [],
  })
  tables: Table[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'DailyRegister',
    default: null,
  })
  dailyRegister?: DailyRegister;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'CashierSession',
    default: null,
  })
  cashierSession?: CashierSession;
}
export const UserSchema = SchemaFactory.createForClass(User);
