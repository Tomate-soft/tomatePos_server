import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from 'src/dto/role/createRoleDto';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async findAll() {
    try {
      const roleArray = await this.roleService.findAll();
      if (!roleArray) {
        throw new NotFoundException('No se encontraron roles');
      }
      return roleArray;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, mas informacion ${error}`,
      );
    }
  }

  @Post()
  async create(@Body() body: CreateRoleDto) {
    try {
      const newRole = await this.roleService.create(body);
      return newRole;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Este rol ya existe');
      }
      throw new ConflictException(
        `Ha ocurrido un error inepserado el crear el rol, mas informacion: ${error}`,
      );
    }
  }
}
