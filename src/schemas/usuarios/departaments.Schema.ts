import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Departament {
  @Prop({
    trim: true,
  })
  code: number;

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  departamentName: string;
}

export const DepartamentSchema = SchemaFactory.createForClass(Departament);
