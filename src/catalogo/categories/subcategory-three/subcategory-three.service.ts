import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import { CreateCategoryDto } from 'src/dto/catalogo/categories/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/catalogo/categories/updateCategory.dto';
import { SubCategoryFour } from 'src/schemas/catalogo/subcategories/subCategoryFour.Schema';
import { SubCategoryThree } from 'src/schemas/catalogo/subcategories/subCategoryThree.Schema';

@Injectable()
export class SubcategoryThreeService {
  constructor(
    @InjectModel(SubCategoryThree.name)
    private subcategoryThreeModel: Model<SubCategoryThree>,
    @InjectModel(SubCategoryFour.name)
    private subcategoryFourModel: Model<SubCategoryFour>,
  ) {}
  // categories.service.ts
  async findAll() {
    try {
      return await this.subcategoryThreeModel
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
  /*create(createCategory: any){
       const newCtegory = this.subcategoryThreeModel.create(createCategory);
       return newCtegory;
    } */

  async create(createCategory: CreateCategoryDto) {
    /* const lastCategory = await this.subcategoryThreeModel.findOne(
      {},
      { code: 1 },
      { sort: { code: -1 } },
    ); // encontramos la ultima categoria creada
    let newCode: string;
    if (lastCategory) {
      const lastCode = lastCategory.code;
      const nextNumber = lastCode + 1;
      newCode = nextNumber.toString().padStart(2, '0'); // Asegura que el código tenga al menos 2 dígitos.
    } else {
      newCode = '01';
    }
    console.log(newCode);
    createCategory.code = newCode; */
    const newCategory = new this.subcategoryThreeModel(createCategory);
    return await newCategory.save();
  }

  async findOne(id: string) {
    return await this.subcategoryThreeModel.findById(id);
  }

  async delete(id: string) {
    return await this.subcategoryThreeModel.findByIdAndDelete(id);
  }
  async update(id: string, category: UpdateCategoryDto) {
    return await this.subcategoryThreeModel.findByIdAndUpdate(id, category, {
      new: true,
    });
  }

  async replace(): Promise<DeleteResult> {
    return await this.subcategoryThreeModel.deleteMany({}).exec();
  }
  async discontinue(id: string, category: UpdateCategoryDto) {
    const updatedCategory = await this.subcategoryThreeModel
      .findOneAndUpdate({ _id: id }, category, { new: true })
      .populate({
        path: 'subCategories',
      })
      .exec();

    if (!updatedCategory) {
      throw new NotFoundException('Categoría no encontrada');
    }

    await this.updateSubcategoriesStatus(
      updatedCategory.subCategories,
      category.status,
    );

    return updatedCategory;
  }

  private async updateSubcategoriesStatus(
    subcategories: any[],
    status: string,
  ) {
    for (const subcategoryfour of subcategories) {
      await this.subcategoryFourModel.findByIdAndUpdate(subcategoryfour._id, {
        status,
      });
    }
  }
}
