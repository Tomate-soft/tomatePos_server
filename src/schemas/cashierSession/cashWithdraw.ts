import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
// import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class CashWithdraw {
  @Prop({ required: true })
  quantity: string;

  @Prop({ required: true })
  operation: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  sessionId: string;
}

const CashWithdrawSchema = SchemaFactory.createForClass(CashWithdraw);
export default CashWithdrawSchema;
