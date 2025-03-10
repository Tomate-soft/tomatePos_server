import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ReopenService } from './reopen.service';
import { CreateReopenDto } from 'src/dto/reopen/createReopen';

@Controller('reopen')
export class ReopenController {
  constructor(private reopenService: ReopenService) {}

  @Get()
  async findAll() {
    try {
      const data = await this.reopenService.findAll();
      if (!data) {
        throw new NotFoundException('No data found');
      }
      return data;
    } catch (error) {
      throw new NotFoundException('No data found');
    }
  }

  @Post()
  async create(@Body() payload: CreateReopenDto) {
    try {
      const data = await this.reopenService.create(payload);
      return data;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Already exists');
      }
      throw new NotFoundException('No data found');
    }
  }

  @Post('note')
  async createReopenNote(@Body() payload: CreateReopenDto) {
    try {
      const data = await this.reopenService.createReopenNote(payload);
      return data;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Already exists');
      }
      throw new NotFoundException('No data found');
    }
  }
}
