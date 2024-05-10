import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from 'src/dto/role/createRoleDto';
import { Role } from 'src/schemas/role/role';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async findAll() {
    return this.roleModel.find().exec();
  }

  async create(body: CreateRoleDto) {
    const newRole = new this.roleModel(body);
    return await newRole.save();
  }
}
