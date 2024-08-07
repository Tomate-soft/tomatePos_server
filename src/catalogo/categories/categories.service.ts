import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../schemas/catalogo/categories.schema';
import { CreateCategoryDto } from 'src/dto/catalogo/categories/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/catalogo/categories/updateCategory.dto';
import { DeleteResult } from 'mongodb';
import { SubCategoryOne } from 'src/schemas/catalogo/subcategories/subCategoryOne.Schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(SubCategoryOne.name)
    private subcategoryOneModel: Model<SubCategoryOne>,
  ) {}

  async findAll() {
    try {
      return await this.categoryModel
        .find()
        .populate({
          path: 'subCategories',
        })
        .exec();
    } catch (error) {
      console.error('Error al buscar categorías:', error);
      throw error;
    }
  }

  async create(createCategory: CreateCategoryDto) {
    const session = await this.categoryModel.startSession();
    session.startTransaction();
    try {
      const lastCategory = await this.categoryModel
        .findOne({})
        .sort({ code: -1 })
        .exec();

      const nextCode = this.getNextCode(lastCategory?.code);
      const newCategory = new this.categoryModel({
        ...createCategory,
        code: nextCode,
      });
      const category = await newCategory.save();
      if (!category) {
        await session.abortTransaction();
        session.endSession();
        throw new Error('No se pudo completar la operación');
      }

      await session.commitTransaction();
      session.endSession();
      return newCategory;
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      throw new Error('Error al crear la categoría');
    }
  }

  async findOne(id: string) {
    return await this.categoryModel.findById(id);
  }

  async delete(id: string) {
    return await this.categoryModel.findByIdAndDelete(id);
  }

  async update(id: string, category: UpdateCategoryDto) {
    return await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
    });
  }

  async replace(): Promise<DeleteResult> {
    return await this.categoryModel.deleteMany({}).exec();
  }

  private getNextCode(lastCode: string): string {
    if (!lastCode) {
      return '01';
    }
    const numericCode = parseInt(lastCode, 10);
    const nextNumericCode = numericCode + 1;
    return nextNumericCode.toString().padStart(2, '0');
  }
}
