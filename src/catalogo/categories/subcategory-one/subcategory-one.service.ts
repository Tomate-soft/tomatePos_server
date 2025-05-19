import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import { UpdateCategoryDto } from 'src/dto/catalogo/categories/updateCategory.dto';
import { Category } from 'src/schemas/catalogo/categories.schema';
import { SubCategoryOne } from 'src/schemas/catalogo/subcategories/subCategoryOne.Schema';

@Injectable()
export class SubcategoryOneService {
  constructor(
    @InjectModel(SubCategoryOne.name)
    private subcategoryOneModel: Model<SubCategoryOne>,
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async findAll() {
    try {
      return await this.subcategoryOneModel.find();
    } catch (error) {
      console.error('Error al buscar categorías:', error);
      throw error;
    }
  }
  async create(createCategory: SubCategoryOne) {
    const session = await this.subcategoryOneModel.startSession();
    session.startTransaction();
    try {
      const category = await this.categoryModel.findById(
        createCategory.categoryId,
      );
      if (!category) {
        throw new Error('No se encontró la categoría');
      }

      const nextCode = await this.getNextCode(createCategory.categoryId);
      const newCategory = new this.subcategoryOneModel({
        ...createCategory,
        code: nextCode,
      });

      await newCategory.save({ session });

      const subApt = [...category.subCategories, newCategory._id];
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        category._id,
        { subCategories: subApt },
        { session, new: true },
      );

      if (!updatedCategory) {
        throw new Error('No se pudo actualizar la categoría');
      }

      await session.commitTransaction();
      session.endSession();
      return newCategory;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      console.error(error);
      throw new Error('Error al crear la subcategoría');
    }
  }

  async findOne(id: string) {
    return await this.subcategoryOneModel.findById(id);
  }

  async delete(id: string) {
    return await this.subcategoryOneModel.findByIdAndDelete(id);
  }
  async update(id: string, category: UpdateCategoryDto) {
    return await this.subcategoryOneModel.findByIdAndUpdate(id, category, {
      new: true,
    });
  }

  async replace(): Promise<DeleteResult> {
    return await this.subcategoryOneModel.deleteMany({}).exec();
  }

  private async getNextCode(categoryId: string): Promise<string> {
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      throw new Error('Categoría padre no encontrada');
    }

    const lastSubcategory = await this.subcategoryOneModel
      .findOne({ categoryId })
      .sort({ code: -1 })
      .exec();

    let subcategoryCode = '01';
    if (lastSubcategory) {
      const lastCode = lastSubcategory.code.slice(-2);
      const nextNumericCode = parseInt(lastCode, 10) + 1;
      subcategoryCode = nextNumericCode.toString().padStart(2, '0');
    }

    const parentCode = category.code.padStart(2, '0');

    return `${parentCode}${subcategoryCode}`;
  }
}
