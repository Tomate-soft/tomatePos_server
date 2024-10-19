import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Schema as MoongooseSchema } from 'mongoose';
import { User } from '../users.schema';
import { Bills } from '../ventas/bills.schema';

@Schema({ versionKey: false, timestamps: true })
export class Reopen {
  @Prop({
    required: true,
    type: MoongooseSchema.Types.ObjectId,
    ref: 'Bills',
  })
  accountId: Bills;

  @Prop({
    required: true,
    type: MoongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;
}

export const ReopenSchema = SchemaFactory.createForClass(Reopen);
