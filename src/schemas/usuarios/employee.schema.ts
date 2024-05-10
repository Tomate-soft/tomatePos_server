import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Employee {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  code: string;

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  employeeName: string;

  @Prop({
    required: true,
    trim: true,
  })
  status: 'active' | 'inactive' | 'absent';

  @Prop({
    required: true,
    trim: true,
  })
  profile: string;

  @Prop({
    required: true,
    trim: true,
  })
  shift: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
