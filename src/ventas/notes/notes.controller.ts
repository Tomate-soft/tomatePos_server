import {
  Controller,
  NotFoundException,
  Get,
  Param,
  Body,
  Post,
  ConflictException,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { createNoteDto } from 'src/dto/ventas/notes/createNoteDto';
import { updateNoteDto } from 'src/dto/ventas/notes/updateNoteDto';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Get()
  async findAll() {
    try {
      const notesArray = await this.noteService.findAll();
      if (!notesArray) {
        throw new NotFoundException('No hay notas');
      }
      return notesArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedNote = await this.noteService.findOne(id);
      if (!selectedNote) {
        throw new NotFoundException('No existe la nota');
      }
      return selectedNote;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Post()
  async create(@Body() body: createNoteDto) {
    try {
      const newNote = await this.noteService.create(body);
      return newNote;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Esta nota ya existe');
      }
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Delete('id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const deletedNote = await this.noteService.delete(id);
      if (!deletedNote) {
        throw new NotFoundException('No existe la nota que intenta eliminar');
      }
      return deletedNote;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { accountId: string | null; body: updateNoteDto },
  ) {
    try {
      const updatedNote = await this.noteService.update(
        id,
        body.body,
        body.accountId,
      );
      if (!updatedNote) {
        throw new NotFoundException(
          'La nota que intentas actualizar no se encontro',
        );
      }
      return updatedNote;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }
}
