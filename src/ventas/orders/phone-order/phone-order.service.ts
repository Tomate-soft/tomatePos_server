import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createPhoneDto } from 'src/dto/ventas/orders/phoneOrder/createPhoneOrder.dto';
import { Branch } from 'src/schemas/business/branchSchema';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { PhoneOrder } from 'src/schemas/ventas/orders/phoneOrder.schema';
import { branchId } from 'src/variablesProvisionales';

@Injectable()
export class PhoneOrderService {
  constructor(
    @InjectModel(PhoneOrder.name) private phoneOrderModel: Model<PhoneOrder>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
  ) {}

  async update(id: string, body: createPhoneDto) {
    return await this.phoneOrderModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async create(body: createPhoneDto) {
    const session = await this.phoneOrderModel.startSession();
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

      // Método más preciso para obtener el último código
      const lastOrderInPeriod = await this.phoneOrderModel.aggregate([
        {
          $match: {
            operatingPeriod: operatingPeriod._id,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $limit: 1,
        },
        {
          $project: {
            code: 1,
          },
        },
      ]);

      const nextBillCode = lastOrderInPeriod.length
        ? this.getNextOrderCode(parseFloat(lastOrderInPeriod[0].code))
        : 1;

      const formatCode = this.formatCode(nextBillCode.toString());

      const newOrderData = {
        ...body,
        code: formatCode,
        operatingPeriod: operatingPeriod._id,
      };
      const newOrder = new this.phoneOrderModel(newOrderData);
      return newOrder.save();
    });
  }

  async findAll() {
    return await this.phoneOrderModel.find();
  }

  // Método para obtener el siguiente código de orden
  private getNextOrderCode(lastOrderCode: number): number {
    // Incrementar el código de orden actual en 1
    return lastOrderCode + 1;
  }

  // Método para formatear a 6 dígitos
  private formatCode(code: string): string {
    return code.padStart(6, '0');
  }
}
