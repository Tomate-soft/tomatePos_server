import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Profile } from './usuarios/profiles.Schema';
import { Table } from './tables/tableSchema';
import { DailyRegister } from './dailyRegister/createDailyRegister';
import { CashierSession } from './cashierSession/cashierSession';
import { ToGoOrder } from './ventas/orders/toGoOrder.schema';
import { RappiOrder } from './ventas/orders/rappiOrder.schema';
import { PhoneOrder } from './ventas/orders/phoneOrder.schema';

export interface Transaction {
  paymentType: string;
  quantity: string;
  payQuantity: string;
  tips: string;
}

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

  @Prop({ type: Object, default: {} })
  authorizations?: {
    admin: {
      active: boolean;
      modules: Record<string, any>; // Objeto para almacenar módulos específicos del admin
    };
    pos: {
      active: boolean;
      sellTypes: {
        restaurant: string[]; // Array de cadenas para los tipos de venta de restaurante
      };
    };
  };

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

  @Prop({ trim: true, default: [] })
  tips?: Transaction[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'ToGoOrder' }],
    default: [],
  })
  togoorders?: ToGoOrder[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'RappiOrder' }],
    default: [],
  })
  rappiOrders?: RappiOrder[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'PhoneOrder' }],
    default: [],
  })
  phoneOrders?: PhoneOrder[];
}

export const UserSchema = SchemaFactory.createForClass(User);
