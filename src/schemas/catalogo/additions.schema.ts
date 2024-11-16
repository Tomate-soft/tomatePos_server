import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Modifier } from './modifiers.Schema';
import { Dishes } from './dishes.schema';

@Schema({ timestamps: true, versionKey: false })
export class Addition {
  @Prop({
    required: true,
    trim: true,
  })
  groupName: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Modifier' }],
    default: [],
  })
  modifiers: Modifier[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Dishes' }],
    default: [],
  })
  dishes: Dishes[];
}

export const AdditionsSchema = SchemaFactory.createForClass(Addition);
