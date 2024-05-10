import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import { CreateCategoryDto } from 'src/dto/catalogo/categories/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/catalogo/categories/updateCategory.dto';
import { SubCategoryFour } from 'src/schemas/catalogo/subcategories/subCategoryFour.Schema';

@Injectable()
export class SubcategoryFourService {
  constructor(
    @InjectModel(SubCategoryFour.name)
    private subcategoryFourModel: Model<SubCategoryFour>,
  ) {}
  // categories.service.ts
  async findAll() {
    return await this.subcategoryFourModel.find();
  }
  /*create(createCategory: any){
       const newCtegory = this.subcategoryFourModel.create(createCategory);
       return newCtegory;
    } */

  async create(createCategory: CreateCategoryDto) {
    /* const lastCategory = await this.subcategoryFourModel.findOne(
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
    const newCategory = new this.subcategoryFourModel(createCategory);
    return await newCategory.save();
  }

  async findOne(id: string) {
    return await this.subcategoryFourModel.findById(id);
  }

  async delete(id: string) {
    return await this.subcategoryFourModel.findByIdAndDelete(id);
  }
  async update(id: string, category: UpdateCategoryDto) {
    return await this.subcategoryFourModel.findByIdAndUpdate(id, category, {
      new: true,
    });
  }

  async replace(): Promise<DeleteResult> {
    return await this.subcategoryFourModel.deleteMany({}).exec();
  }
} //
