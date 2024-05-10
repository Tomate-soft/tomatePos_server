import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from 'src/dto/catalogo/categories/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/catalogo/categories/updateCategory.dto';
import { Category } from 'src/schemas/catalogo/categories.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  // categories.controller.ts
  @Get()
  async findAll(): Promise<Category[]> {
    try {
      const categoriesArray = await this.categoriesService.findAll();
      if (!categoriesArray || categoriesArray.length === 0) {
        throw new NotFoundException('No se encontraron categorías.');
      }
      return categoriesArray;
    } catch (error) {
      console.error('Error al buscar categorías:', error);
      throw new ConflictException(
        'Ocurrió un error inesperado al buscar categorías.',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.categoriesService.findOne(id);
      if (!category) throw new NotFoundException('Esta categoria no existe');
      return category;
    } catch (error) {
      throw new ConflictException('Ocurrio algo inesperado');
    }
  }

  @Post()
  async create(@Body() body: CreateCategoryDto | CreateCategoryDto[]) {
    try {
      const categoriesService = this.categoriesService; // Captura de this en una variable

      if (Array.isArray(body)) {
        await this.categoriesService.replace();
        const createdCategories = await Promise.all(
          body.map(async (element: CreateCategoryDto) => {
            return await categoriesService.create(element); // Usar la variable categoriesService
          }),
        );
        return createdCategories;
      } else {
        const createdCategory = await categoriesService.create(body); // Usar la variable categoriesService
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
      const categoryDeleted = await this.categoriesService.delete(id);
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
      const categoryUpdated = await this.categoriesService.update(id, body);
      /*
      if (categoryUpdated.subCategories.length > 0) {
        console.log('entre aca');
        const upd = categoryUpdated.subCategories.
      } */
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
      const categoryUpdated = await this.categoriesService.discontinue(
        id,
        body,
      );
      /*
      if (categoryUpdated.subCategories.length > 0) {
        console.log('entre aca');
        const upd = categoryUpdated.subCategories.
      } */
      if (!categoryUpdated)
        throw new NotFoundException('No se encontro la categoria');
      return categoryUpdated;
    } catch (error) {
      throw new NotFoundException('Ocurrio algo inesperado');
    }
  }
}
