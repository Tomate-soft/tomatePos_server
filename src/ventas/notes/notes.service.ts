import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, model } from 'mongoose';
import { flatMap } from 'rxjs';
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
      if (updatedNote.status) {
        const session = await this.noteModel.startSession();
        session.startTransaction();

        try {
          console.log('esto trae updatedNote');
          console.log(updatedNote);

          // Actualizar note
          const upNote = await this.noteModel.findByIdAndUpdate(
            id,
            updatedNote,
            { new: true, session },
          );

          // Actualizar bill
          const updateBill = await this.BillsModel.findByIdAndUpdate(
            accountId,
            updatedNote,
            { new: true },
          );
          console.log('ac la BILL wactualizada');
          console.log(updateBill);

          const res = { updNote: upNote, updBill: updateBill };

          await session.commitTransaction();
          session.endSession();

          return res;
        } catch (error) {
          await session.abortTransaction();
          session.endSession();
          console.error('Hubo un error durante la sesión:', error);
          throw error; // Vuelve a lanzar el error para que pueda ser manejado adecuadamente aguas arriba
        }
      }

      const billCurrent = await this.BillsModel.findById(accountId); // BUSCAMOS LA CUENTA ACTUAL A LA CUAL PERTENECE LA NOTA
      if (billCurrent && billCurrent.notes.length > 0) {
        //
        const upNote = await this.noteModel.findByIdAndUpdate(id, updatedNote, {
          new: true,
        }); // ACTUALIZAMOS L ANOTA
        if (upNote) {
          const refreshedBill = await this.BillsModel.findById(
            //SI L ANOTA SE ACTUALIZO BUSCAMOS LA CUIENTA DE NUEVO
            accountId,
          ).populate({ path: 'notes' });

          const newTotal = refreshedBill.notes.reduce(
            (total, element) => total + parseFloat(element.checkTotal), //CALCULAMOS EL NUIEVO TOTAL
            0,
          );
          const sumProducts = [].concat(
            ...refreshedBill.notes.map((element) => element.products),
          );

          const refreshData = { checkTotal: newTotal, products: sumProducts };

          const refreshTotalInBill = await this.BillsModel.findByIdAndUpdate(
            //ACTUALIZAMOS LA CUENTA CON EL NUEVO TOTAL // y los nuevos productos
            accountId,
            refreshData,
          );

          return refreshTotalInBill; //RETORNAMOS LA CUENTA ACTUALIZADA
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
