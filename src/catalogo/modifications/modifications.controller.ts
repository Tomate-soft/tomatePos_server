import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ModificationsService } from './modifications.service';
import { createModifierDto } from 'src/dto/catalogo/modifiers/createModifierDto';
import { updateModifierDto } from 'src/dto/catalogo/modifiers/updateModifierDto';

@Controller('modifications')
export class ModificationsController {
  constructor(private modifierService: ModificationsService) {}

  @Get()
  async findAll() {
    try {
      const modifiersArray = await this.modifierService.findAll();
      if (!modifiersArray || modifiersArray.length === 0) {
        throw new NotFoundException('No se ha encontrado ningún modificador');
      }
      return modifiersArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get(':id')
  async findOne(id: string) {
    try {
      const selectedModifier = await this.modifierService.findOne(id);
      if (!selectedModifier)
        throw new NotFoundException(
          'El modificador que intentas buscar no existe',
        );
      return selectedModifier;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Post()
  async create(@Body() body: createModifierDto | createModifierDto[]) {
    const modService = this.modifierService;
    try {
      if (Array.isArray(body)) {
        await this.modifierService.replace();
        const createdModifier = await Promise.all(
          body.map(async (element: createModifierDto) => {
            return await modService.create(element);
          }),
        );
        return createdModifier;
      } else {
        const createdModifier = await this.modifierService.create(body);
        return createdModifier;
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('El Modificador ya existe');
      } else {
        throw new NotFoundException('Ha ocurrido algo inesperado');
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const modifierDeleted = await this.modifierService.delete(id);
      if (!modifierDeleted) {
        throw new NotFoundException('No existe el modificador');
      }
      return modifierDeleted;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, updatedModifier: updateModifierDto) {
    try {
      const modifierUpdated = await this.modifierService.update(
        id,
        updatedModifier,
      );
      if (!modifierUpdated) {
        throw new NotFoundException('No existe el moficador');
      }
      return modifierUpdated;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido añlgo inesperado');
    }
  }
}
