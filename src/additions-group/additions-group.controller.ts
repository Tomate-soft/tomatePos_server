import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { AdditionsGroupService } from './additions-group.service';
import { CreateAdditionDto } from 'src/dto/catalogo/additions/createGroup.dto';

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
}
