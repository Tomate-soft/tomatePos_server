import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from 'src/dto/usuarios/empleados/createEmployeeDto';
import { UpdateEmployeeDto } from 'src/dto/usuarios/empleados/updateEmployeeDto';
import { Employee } from 'src/schemas/usuarios/employee.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async findAll() {
    return this.employeeModel.find();
  }

  async findOne(id: string) {
    return this.employeeModel.findById(id);
  }

  async create(createEmployee: CreateEmployeeDto) {
    const newEmployee = new this.employeeModel(createEmployee);
    return await newEmployee.save();
  }
  async delete(id: string) {
    return await this.employeeModel.findByIdAndDelete(id);
  }
  async update(id: string, updateEmployee: UpdateEmployeeDto) {
    return await this.employeeModel.findByIdAndUpdate(id, updateEmployee, {
      new: true,
    });
  }
}
