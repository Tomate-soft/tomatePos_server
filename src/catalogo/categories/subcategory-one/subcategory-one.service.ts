import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import { CreateCategoryDto } from 'src/dto/catalogo/categories/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/catalogo/categories/updateCategory.dto';
import { SubCategoryFour } from 'src/schemas/catalogo/subcategories/subCategoryFour.Schema';
import { SubCategoryOne } from 'src/schemas/catalogo/subcategories/subCategoryOne.Schema';
import { SubCategoryThree } from 'src/schemas/catalogo/subcategories/subCategoryThree.Schema';
import { SubCategoryTwo } from 'src/schemas/catalogo/subcategories/subCategoryTwo.schema';

@Injectable()
export class SubcategoryOneService {
  constructor(
    @InjectModel(SubCategoryOne.name)
    private subcategoryOneModel: Model<SubCategoryOne>,
    @InjectModel(SubCategoryTwo.name)
    private subcategoryTwoModel: Model<SubCategoryTwo>,
    @InjectModel(SubCategoryThree.name)
    private subcategoryThreeModel: Model<SubCategoryThree>,
    @InjectModel(SubCategoryFour.name)
    private subcategoryFourModel: Model<SubCategoryFour>,
  ) {}

  async findAll() {
    try {
      return await this.subcategoryOneModel
        .find()
        .populate({
          path: 'subCategories',
          populate: {
            path: 'subCategories',
            populate: {
              path: 'subCategories',
            },
          },
        })
        .exec();
    } catch (error) {
      console.error('Error al buscar categorías:', error);
      throw error;
    }
  }
  /*create(createCategory: any){
         const newCtegory = this.categoryModel.create(createCategory);
         return newCtegory;
      } */

  async create(createCategory: CreateCategoryDto) {
    /* const lastCategory = await this.categoryModel.findOne(
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
    const newCategory = new this.subcategoryOneModel(createCategory);
    return await newCategory.save();
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

  async discontinue(id: string, category: UpdateCategoryDto) {
    const updatedCategory = await this.subcategoryOneModel
      .findOneAndUpdate({ _id: id }, category, { new: true })
      .populate({
        path: 'subCategories',
        populate: {
          path: 'subCategories',
          populate: {
            path: 'subCategories',
          },
        },
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
    for (const subcategorytwo of subcategories) {
      if (
        subcategorytwo.subCategories &&
        subcategorytwo.subCategories.length >= 1
      ) {
        for (const subcategorythree of subcategorytwo.subCategories) {
          if (
            subcategorythree.subCategories &&
            subcategorythree.subCategories.length >= 1
          ) {
            for (const subcategoryfour of subcategorythree.subCategories) {
              await this.subcategoryFourModel.findByIdAndUpdate(
                subcategoryfour._id,
                {
                  status,
                },
              );
            }
          }

          await this.subcategoryThreeModel.findByIdAndUpdate(
            subcategorythree._id,
            {
              status,
            },
          );
        }
      }

      await this.subcategoryTwoModel.findByIdAndUpdate(subcategorytwo._id, {
        status,
      });
    }
  }
}
