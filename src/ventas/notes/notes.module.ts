import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NoteSchema, Notes } from 'src/schemas/ventas/notes.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BillsService } from '../bills/bills.service';
import { BillSchema, Bills } from 'src/schemas/ventas/bills.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notes.name,
        schema: NoteSchema,
      },
      {
        name: Bills.name,
        schema: BillSchema,
      },
    ]),
  ],
  controllers: [NotesController],
  providers: [NotesService, BillsService],
})
export class NotesModule {}
