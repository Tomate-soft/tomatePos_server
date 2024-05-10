import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../schemas/catalogo/categories.schema';
import { CreateCategoryDto } from 'src/dto/catalogo/categories/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/catalogo/categories/updateCategory.dto';
import { DeleteResult } from 'mongodb';
import { SubCategoryOne } from 'src/schemas/catalogo/subcategories/subCategoryOne.Schema';
import { SubCategoryTwo } from 'src/schemas/catalogo/subcategories/subCategoryTwo.schema';
import { SubCategoryThree } from 'src/schemas/catalogo/subcategories/subCategoryThree.Schema';
import { SubCategoryFour } from 'src/schemas/catalogo/subcategories/subCategoryFour.Schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
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
      return await this.categoryModel
        .find()
        .populate({
          path: 'subCategories',
          populate: {
            path: 'subCategories',
            populate: {
              path: 'subCategories',
              populate: {
                path: 'subCategories',
              },
            },
          },
        })
        .exec();
    } catch (error) {
      console.error('Error al buscar categorías:', error);
      throw error;
    }
  }

  async create(createCategory: CreateCategoryDto) {
    const newCategory = new this.categoryModel(createCategory);
    return await newCategory.save();
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

  async discontinue(id: string, category: UpdateCategoryDto) {
    const updatedCategory = await this.categoryModel
      .findOneAndUpdate({ _id: id }, category, { new: true })
      .populate({
        path: 'subCategories',
        populate: {
          path: 'subCategories',
          populate: {
            path: 'subCategories',
            populate: {
              path: 'subCategories',
            },
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
    for (const subcategory of subcategories) {
      if (subcategory.subCategories && subcategory.subCategories.length >= 1) {
        for (const subcategorytwo of subcategory.subCategories) {
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

      await this.subcategoryOneModel.findByIdAndUpdate(subcategory._id, {
        status,
      });
    }
  }
}
