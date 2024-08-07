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
import { UpdateCategoryDto } from 'src/dto/catalogo/categories/updateCategory.dto';
import { SubcategoryOneService } from './subcategory-one.service';
import { SubCategoryOne } from 'src/schemas/catalogo/subcategories/subCategoryOne.Schema';

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

  @Post()
  async create(@Body() body: SubCategoryOne | SubCategoryOne[]) {
    try {
      const subcategoryOneService = this.subcategoryOneService;

      if (Array.isArray(body)) {
        await this.subcategoryOneService.replace();
        const createdCategories = await Promise.all(
          body.map(async (element: SubCategoryOne) => {
            return await subcategoryOneService.create(element);
          }),
        );
        return createdCategories;
      } else {
        const createdCategory = await subcategoryOneService.create(body);
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
}
