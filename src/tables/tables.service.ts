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
          populate: [
            {
              path: 'notes',
              populate: {
                path: 'discount',
              },
            },
            {
              path: 'discount',
            },
          ],
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
        populate: [
          {
            path: 'notes',
            populate: { path: 'discount' },
          },
          { path: 'discount' },
        ],
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

  async joinTables(body: any) {
    console.log('body', body);

    // Copia profunda de body.tables para evitar modificar el original
    const tablesCopy = JSON.parse(JSON.stringify(body.tables));

    // Verificar si hay mesas con cuentas activas
    const tableWithAccount = tablesCopy.filter(
      (table) => table.bill.length > 0,
    );
    const accountEnable = tableWithAccount.length > 0;

    if (accountEnable) {
      // Encontrar la primera mesa con cuenta activa
      const tableActive = tableWithAccount[0];

      // Filtrar las mesas que no son la mesa activa
      const tablesNoActive = tablesCopy.filter(
        (table) => table._id !== tableActive._id,
      );
      const tableNums = tablesNoActive.map((table) => table.tableNum);
      const objectIds = tablesNoActive.map((table) => table._id);

      // Crear el filtro para seleccionar las mesas por sus IDs
      const filter = { _id: { $in: objectIds } };
      // Definir la actualización que quieres aplicar
      const update = { $set: { availability: false } };

      // Iniciar una sesión y transacción en MongoDB
      const session = await this.tableModel.startSession();
      session.startTransaction();

      try {
        // Actualizar las mesas restantes para establecer su disponibilidad a false
        await this.tableModel.updateMany(filter, update, { session });

        // Actualizar la mesa activa para incluir las mesas unidas
        await this.tableModel.updateOne(
          { _id: tableActive._id },
          { $set: { joinedTables: tableNums } },
          { session },
        );

        // Confirmar la transacción
        await session.commitTransaction();
        session.endSession();

        return { message: 'Mesas unidas correctamente a la mesa activa' };
      } catch (error) {
        // Manejo de errores y reversión de la transacción en caso de fallo
        await session.abortTransaction();
        session.endSession();
        console.error('Error uniendo mesas:', error);
        throw new Error('Error uniendo mesas');
      }
    } else {
      // Si no hay mesas con cuentas activas, buscar la mesa con el número más bajo
      const tableMin = tablesCopy.reduce(
        (min, table) =>
          parseFloat(table.tableNum) < parseFloat(min.tableNum) ? table : min,
        tablesCopy[0],
      );
      console.log('tableMin', tableMin);

      // Filtrar las mesas restantes que no son la mínima
      const tablesNoMin = tablesCopy.filter(
        (table) => table._id !== tableMin._id,
      );
      const tableNums = tablesNoMin.map((table) => table.tableNum);
      const objectIds = tablesNoMin.map((table) => table._id);

      // Crear el filtro para seleccionar las mesas por sus IDs
      const filter = { _id: { $in: objectIds } };
      // Definir la actualización que quieres aplicar
      const update = { $set: { availability: false } };

      // Iniciar una sesión y transacción en MongoDB
      const session = await this.tableModel.startSession();
      session.startTransaction();

      try {
        // Actualizar las mesas restantes para establecer su disponibilidad a false
        await this.tableModel.updateMany(filter, update, { session });

        // Actualizar la mesa mínima para incluir las mesas unidas
        await this.tableModel.updateOne(
          { _id: tableMin._id },
          { $set: { joinedTables: tableNums } },
          { session },
        );

        // Confirmar la transacción
        await session.commitTransaction();
        session.endSession();

        return { message: 'Mesas unidas correctamente' };
      } catch (error) {
        // Manejo de errores y reversión de la transacción en caso de fallo
        await session.abortTransaction();
        session.endSession();
        console.error('Error uniendo mesas:', error);
        throw new Error('Error uniendo mesas');
      }
    }
  }

  /*

  async joinTables(body: any) {
    console.log('body', body);

    // Copia profunda de body.tables para evitar modificar el original
    const tablesCopy = JSON.parse(JSON.stringify(body.tables));

    // Verificar si hay mesas con cuentas activas
    const accountEnable = tablesCopy.some((table) => table.bill.length > 0);
    const tableWithAccount = tablesCopy.filter(
      (table) => table.bill.length > 0,
    );

    switch (accountEnable) {
      case true:
        // Si hay mesas con cuentas activas, retornar un mensaje y las mesas con cuentas activas
        return {
          message: 'No se puede unir mesas con cuentas activas',
          tables: tableWithAccount,
        };

      case false:
        // Si no hay mesas con cuentas activas, buscar la mesa con el número más bajo
        const tableMin = tablesCopy.reduce(
          (min, table) =>
            parseFloat(table.tableNum) < parseFloat(min.tableNum) ? table : min,
          tablesCopy[0],
        );
        console.log('tableMin', tableMin);

        // Filtrar las mesas restantes que no son la mínima
        const tablesNoMin = tablesCopy.filter(
          (table) => table._id !== tableMin._id,
        );
        const tableNums = tablesNoMin.map((table) => table.tableNum);
        const objectIds = tablesNoMin.map((table) => table._id);

        // Crear el filtro para seleccionar las mesas por sus IDs
        const filter = { _id: { $in: objectIds } };
        // Definir la actualización que quieres aplicar
        const update = { $set: { availability: false } };

        // Iniciar una sesión y transacción en MongoDB
        const session = await this.tableModel.startSession();
        session.startTransaction();

        try {
          // Actualizar las mesas restantes para establecer su disponibilidad a false
          await this.tableModel.updateMany(filter, update, { session });

          // Actualizar la mesa mínima para incluir las mesas unidas
          await this.tableModel.updateOne(
            { _id: tableMin._id },
            { $set: { joinedTables: tableNums } },
            { session },
          );

          // Confirmar la transacción
          await session.commitTransaction();
          session.endSession();

          return { message: 'Mesas unidas correctamente' };
        } catch (error) {
          // Manejo de errores y reversión de la transacción en caso de fallo
          await session.abortTransaction();
          session.endSession();
          console.error('Error uniendo mesas:', error);
          throw new Error('Error uniendo mesas');
        }
    }
  }

  */

  async separateTables(id: string) {
    console.log('id', id);
    const session = await this.tableModel.startSession();
    session.startTransaction();
    try {
      const table = await this.tableModel.findById(id);
      if (!table) {
        throw new Error('No se encontro la mesa');
      }
      const tablesToSeparate = table.joinedTables;
      const filter = { tableNum: { $in: tablesToSeparate } };
      const update = { $set: { availability: true, joinedTables: [] } };
      await this.tableModel.updateMany(filter, update, { session });

      // ahora vamos a actualizar la mesa principal con joinedTables vacio
      await this.tableModel.findByIdAndUpdate(
        id,
        { joinedTables: [] },
        { session },
      );
      await session.commitTransaction();
      session.endSession();
      return { message: 'Mesas separadas correctamente' };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Error separando mesas:', error);
      throw new Error('Error separando mesas');
    }
  }
}
