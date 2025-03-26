import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createRappiOrderDto } from 'src/dto/ventas/orders/rappiOrder/createRappiOrder.Dto';
import { updateRappiOrderDto } from 'src/dto/ventas/orders/rappiOrder/updateRappiOrder.Dto';
import { Branch } from 'src/schemas/business/branchSchema';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { RappiOrder } from 'src/schemas/ventas/orders/rappiOrder.schema';
import { branchId } from 'src/variablesProvisionales';

@Injectable()
export class RappiOrderService {
  constructor(
    @InjectModel(RappiOrder.name) private rappiOrderModel: Model<RappiOrder>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
  ) {}

  async update(id: string, body: updateRappiOrderDto) {
    return await this.rappiOrderModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async create(body: createRappiOrderDto) {
    const session = await this.rappiOrderModel.startSession();
    try {
      session.withTransaction(async () => {
        // probar las meter todo en una trabnsaccion
        // Buscar la sucursal actual (asumiendo que tienes una variable o método para obtener el branchId)
        const branch = await this.branchModel.findById(branchId);
        if (!branch) {
          throw new NotFoundException('No se encontró la sucursal');
        }

        // Obtener el período operativo actual
        const periodId = branch.operatingPeriod;
        const operatingPeriod =
          await this.operatingPeriodModel.findById(periodId);

        const newOrderData = {
          ...body,
          operatingPeriod: operatingPeriod._id,
        };

        const newOrder = new this.rappiOrderModel(newOrderData);
        return newOrder.save();
      });
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, mas informacion: ${error}`,
      );
    }
  }

  async findAll() {
    return await this.rappiOrderModel.find();
  }
}
