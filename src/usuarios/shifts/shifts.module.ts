import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { Shift, ShiftSchema } from 'src/schemas/usuarios/shift.Schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Shift.name,
        schema: ShiftSchema,
      },
    ]),
  ],
  providers: [ShiftsService],
  controllers: [ShiftsController],
})
export class ShiftsModule {}
