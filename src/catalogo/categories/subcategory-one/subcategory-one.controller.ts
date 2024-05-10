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
import { CreateCategoryDto } from 'src/dto/catalogo/categories/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/catalogo/categories/updateCategory.dto';
import { SubcategoryOneService } from './subcategory-one.service';

@Controller('subcategory-one')
export class SubcategoryOneController {
  constructor(private subcategoryOneService: SubcategoryOneService) {}
  @Get()
  async findAll() {
    try {
      const categoriesArray = await this.subcategoryOneService.findAll();
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
      const category = await this.subcategoryOneService.findOne(id);
      if (!category) throw new NotFoundException('Esta categoria no existe');
      return category;
    } catch (error) {
      throw new ConflictException('Ocurrio algo inesperado');
    }
  }

  @Post()
  async create(@Body() body: CreateCategoryDto | CreateCategoryDto[]) {
    try {
      const subcategoryOneService = this.subcategoryOneService; // Captura de this en una variable

      if (Array.isArray(body)) {
        await this.subcategoryOneService.replace();
        const createdCategories = await Promise.all(
          body.map(async (element: CreateCategoryDto) => {
            return await subcategoryOneService.create(element); // Usar la variable subcategoryOneService
          }),
        );
        return createdCategories;
      } else {
        const createdCategory = await subcategoryOneService.create(body); // Usar la variable subcategoryOneService
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
      const categoryDeleted = await this.subcategoryOneService.delete(id);
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
      const categoryUpdated = await this.subcategoryOneService.update(id, body);
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
      const categoryUpdated = await this.subcategoryOneService.discontinue(
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
