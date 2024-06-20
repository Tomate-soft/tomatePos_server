import { SchemaFactory, Prop, Schema, MongooseModule } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from '../users.schema';

@Schema({ timestamps: true })
export class CashWithdraw {
  @Prop({ required: true })
  amount: string;

  @Prop({ default: 'withdraw' })
  concept?: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  authUser: User;
}

const CashWithdrawSchema = SchemaFactory.createForClass(CashWithdraw);
export default CashWithdrawSchema;
