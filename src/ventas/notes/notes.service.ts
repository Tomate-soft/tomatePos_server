import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, model } from 'mongoose';
import { createNoteDto } from 'src/dto/ventas/notes/createNoteDto';
import { updateNoteDto } from 'src/dto/ventas/notes/updateNoteDto';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Notes.name) private noteModel: Model<Notes>,
    @InjectModel(Bills.name) private BillsModel: Model<Bills>,
  ) {}

  async findAll() {
    return await this.noteModel.find();
  }

  async findOne(id: string) {
    return await this.noteModel.findById(id);
  }

  async create(createNote: createNoteDto) {
    const lastNote = await this.noteModel
      .findOne({ accountId: createNote.accountId })
      .sort({ createdAt: -1 })
      .exec();
    const nextNoteCode = lastNote
      ? this.getNextNoteCode(lastNote.noteNumber)
      : 1;

    const noteToCreate = new this.noteModel({
      ...createNote,
      noteNumber: nextNoteCode,
    });
    console.log(noteToCreate);

    await noteToCreate.save();
    return noteToCreate;
  }

  async delete(id: string) {
    return await this.noteModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedNote: updateNoteDto, accountId?: string) {
    if (accountId && accountId != null) {
      const billCurrent = await this.BillsModel.findById(accountId);
      if (billCurrent && billCurrent.notes.length > 0) {
        const upNote = await this.noteModel.findByIdAndUpdate(id, updatedNote, {
          new: true,
        });
        if (upNote) {
          const refreshedBill = await this.BillsModel.findById(
            accountId,
          ).populate({ path: 'notes' });

          const newTotal = refreshedBill.notes.reduce(
            (total, element) => total + parseFloat(element.checkTotal),
            0,
          );

          const refreshData = { checkTotal: newTotal };
          const refreshTotalInBill = await this.BillsModel.findByIdAndUpdate(
            accountId,
            refreshData,
          );
          return refreshTotalInBill;
        }
      }
    }

    return await this.noteModel.findByIdAndUpdate(id, updatedNote, {
      new: true,
    });
  }

  private getNextNoteCode(lastBillCode: number): number {
    return lastBillCode + 1;
  }
}
