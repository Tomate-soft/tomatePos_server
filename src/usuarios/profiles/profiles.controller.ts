import {
  Controller,
  NotFoundException,
  Get,
  Param,
  Body,
  Post,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { createProfileDto } from 'src/dto/usuarios/profiles/createProfileDto';
import { updateProfileDto } from 'src/dto/usuarios/profiles/updateProfileDto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}

  @Get()
  async findAll() {
    try {
      const profilesArray = await this.profileService.findAll();
      if (!profilesArray) {
        throw new NotFoundException('No se han encontrado perfiles');
      }
      return profilesArray;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedProfile = await this.profileService.findOne(id);
      if (!selectedProfile) {
        throw new NotFoundException('No existe este perfil');
      }
      return selectedProfile;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }

  @Post()
  async create(@Body() body: createProfileDto) {
    console.log(body);
    try {
      const newProfile = await this.profileService.create(body);
      return newProfile;
    } catch (error) {
      if (error.code === 11000) {
        throw new NotFoundException('Este perfil ya existe');
      }
      throw new NotFoundException(
        'Ha ocurrido un error inesperado, no se ha podido crear',
      );
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const profileDeleted = await this.profileService.delete(id);
      if (!profileDeleted) {
        throw new NotFoundException(
          'No se encuentra el perfil que intentas eliminar',
        );
      }
      return profileDeleted;
    } catch (error) {
      throw new NotFoundException('No se elimino debido a un error inesperado');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: updateProfileDto) {
    try {
      const updatedProfile = await this.profileService.update(id, body);
      if (!updatedProfile) {
        throw new NotFoundException(
          'No se ha encontrado el perfil que deseas actualizar',
        );
      }
      return updatedProfile;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }
}
