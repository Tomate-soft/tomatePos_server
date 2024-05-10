import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from 'src/dto/tables/createTableDto';
import { UpdateTableDto } from 'src/dto/tables/updateTableDto';

@Controller('tables')
export class TablesController {
  constructor(private tableService: TablesService) {}

  @Get()
  async findAll() {
    try {
      const tablesArray = await this.tableService.findAll();
      if (!tablesArray || tablesArray.length === 0)
        throw new NotFoundException('No se han encontrado mesas');
      return tablesArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedTable = await this.tableService.findOne(id);
      if (!selectedTable) {
        throw new NotFoundException('No se han encontrado mesas');
      }
      return selectedTable;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Post()
  async create(@Body() body: CreateTableDto | CreateTableDto[]) {
    const tableService = this.tableService;
    try {
      if (Array.isArray(body)) {
        await this.tableService.replace();
        const createdTables = await Promise.all(
          body.map(async (element: CreateTableDto) => {
            return await tableService.create(element);
          }),
        );
        return createdTables;
      } else {
        const createdTables = await this.tableService.create(body);
        return createdTables;
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('La mesa ya existe');
      } else {
        throw new NotFoundException('Ha ocurrido algo inesperado');
      }
    }
  }

  @Put('reset')
  async resetTables() {
    try {
      const res = await this.tableService.cleanTables();
      if (!res) {
        throw new NotFoundException('No se pudieran liberar las mesas');
      }
      return res;
    } catch (error) {
      throw new NotFoundException(`Ha ocurrido algo inesperado ${error}`);
    }
  }
  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateTable: UpdateTableDto,
  ) {
    try {
      const updatedTable = await this.tableService.update(id, updateTable);
      if (!updatedTable) {
        new NotFoundException('No se encontro la mesa');
      }
      return updateTable;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }

  @Put('upt/:id')
  async updateChars(@Param('id') id: string, @Body() body: UpdateTableDto) {
    try {
      const updatedTable = await this.tableService.update(id, body);
      if (!updatedTable) {
        new NotFoundException('No se encontro la mesa');
      }
      return updatedTable;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido un error inesperado');
    }
  }
}
