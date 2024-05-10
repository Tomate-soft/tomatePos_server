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
import { SubcategoryTwoService } from './subcategory-two.service';
import { CreateCategoryDto } from 'src/dto/catalogo/categories/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/catalogo/categories/updateCategory.dto';

@Controller('subcategory-two')
export class SubcategoryTwoController {
  constructor(private subcategoryTwoService: SubcategoryTwoService) {}
  @Get()
  async findAll() {
    try {
      const categoriesArray = await this.subcategoryTwoService.findAll();
      if (!categoriesArray || categoriesArray.length === 0) {
        throw new NotFoundException('No se encontraron categorías.');
      }
      return categoriesArray;
    } catch (error) {
      throw new ConflictException(
        'Ocurrió un error inesperado al buscar categorías.',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.subcategoryTwoService.findOne(id);
      if (!category) throw new NotFoundException('Esta categoria no existe');
      return category;
    } catch (error) {
      throw new ConflictException('Ocurrio algo inesperado');
    }
  }

  @Post()
  async create(@Body() body: CreateCategoryDto | CreateCategoryDto[]) {
    try {
      const subcategoryTwoService = this.subcategoryTwoService; // Captura de this en una variable

      if (Array.isArray(body)) {
        await this.subcategoryTwoService.replace();
        const createdCategories = await Promise.all(
          body.map(async (element: CreateCategoryDto) => {
            return await subcategoryTwoService.create(element); // Usar la variable subcategoryTwoService
          }),
        );
        return createdCategories;
      } else {
        const createdCategory = await subcategoryTwoService.create(body); // Usar la variable subcategoryTwoService
        return createdCategory;
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('La categoría ya existe');
      } else {
        throw new NotFoundException('Ha ocurrido algo inesperado');
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const categoryDeleted = await this.subcategoryTwoService.delete(id);
      if (!categoryDeleted)
        throw new NotFoundException('La categoria no existe');
      return categoryDeleted;
    } catch (error) {
      throw new ConflictException('Ocurrio algo inesperado');
    }
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    try {
      const categoryUpdated = await this.subcategoryTwoService.update(id, body);
      if (!categoryUpdated)
        throw new NotFoundException('No se encontro la categoria');
      return categoryUpdated;
    } catch (error) {
      throw new NotFoundException('Ocurrio algo inesperado');
    }
  }

  @Put('discontinue/:id')
  async discontinue(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    try {
      const categoryUpdated = await this.subcategoryTwoService.discontinue(
        id,
        body,
      );
      if (!categoryUpdated)
        throw new NotFoundException('No se encontro la categoria');
      return categoryUpdated;
    } catch (error) {
      throw new NotFoundException('Ocurrio algo inesperado');
    }
  }
}
