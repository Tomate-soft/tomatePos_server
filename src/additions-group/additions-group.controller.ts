import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdditionsGroupService } from './additions-group.service';
import { CreateAdditionDto } from 'src/dto/catalogo/additions/createGroup.dto';
import { UpdateAdditionDto } from 'src/dto/catalogo/additions/updateGroup.dto';

@Controller('additions-group')
export class AdditionsGroupController {
  constructor(private additionsGroupService: AdditionsGroupService) {}

  @Get()
  async findAll() {
    try {
      const res = await this.additionsGroupService.findAll();
      if (!res) {
        throw new NotFoundException('AdditionsGroup not found');
      }
      return res;
    } catch (error) {
      throw new NotFoundException('AdditionsGroup not found');
    }
  }

  @Post()
  async create(@Body() body: CreateAdditionDto) {
    console.log(body);
    try {
      const res = await this.additionsGroupService.create(body);
      if (!res) {
        throw new NotFoundException('AdditionsGroup not found');
      }
      return res;
    } catch (error) {
      throw new NotFoundException('AdditionsGroup not found');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateAdditionDto) {
    console.log(body);
    try {
      const res = await this.additionsGroupService.update(id, body);
      if (!res) {
        throw new NotFoundException('AdditionsGroup not found');
      }
      return res;
    } catch (error) {
      throw new NotFoundException('AdditionsGroup not found');
    }
  }
}
