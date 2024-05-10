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
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from 'src/dto/usuarios/empleados/createEmployeeDto';
import { UpdateEmployeeDto } from 'src/dto/usuarios/empleados/updateEmployeeDto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}
  @Get()
  async findAll() {
    try {
      const employeesArray = await this.employeeService.findAll();
      if (!employeesArray) {
        throw new NotFoundException('No se encontraron empleados');
      }
      return employeesArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedEmployee = await this.employeeService.findOne(id);
      if (!selectedEmployee) {
        throw new NotFoundException('No existe este empleado');
      }
      return selectedEmployee;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }

  @Post()
  async create(@Body() body: CreateEmployeeDto) {
    try {
      const newEmployee = await this.employeeService.create(body);
      return newEmployee;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Este usuario ya se encuentra registrado');
      }
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const deletedEmployee = this.employeeService.delete(id);
      if (!deletedEmployee) {
        throw new NotFoundException(
          'No se encontro el ususario que deseas eliminar',
        );
      }
      return deletedEmployee;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido uan error inesperado');
    }
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateEmployeeDto) {
    try {
      const updatedEmployee = this.employeeService.update(id, body);
      if (!updatedEmployee) {
        throw new NotFoundException('No se pudo actualizar este empleado');
      }
      return updatedEmployee;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }
}
