import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import { CreateTableDto } from 'src/dto/tables/createTableDto';
import { UpdateTableDto } from 'src/dto/tables/updateTableDto';
import { Table } from 'src/schemas/tables/tableSchema';

@Injectable()
export class TablesService {
  constructor(@InjectModel(Table.name) private tableModel: Model<Table>) {}
  async findAll() {
    try {
      return await this.tableModel
        .find()
        .populate({
          path: 'bill',
          populate: {
            path: 'notes',
          },
        })
        .populate([
          {
            path: 'user',
          },
        ]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    return await this.tableModel
      .findById(id)
      .populate({
        path: 'bill',
        populate: {
          path: 'notes',
        },
      })
      .populate([
        {
          path: 'user',
        },
      ]);
  }

  async create(createtable: CreateTableDto) {
    const newDish = new this.tableModel(createtable);
    return await newDish.save();
  }
  async delete(id: string) {
    return await this.tableModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedtable: UpdateTableDto) {
    return await this.tableModel.findByIdAndUpdate(id, updatedtable, {
      new: true,
    });
  }

  async replace(): Promise<DeleteResult> {
    return await this.tableModel.deleteMany({}).exec();
  }

  async cleanTables() {
    return await this.tableModel.updateMany(
      {},
      { $set: { assigned: false, user: null } },
    );
  }
}
