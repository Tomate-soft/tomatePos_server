import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createToGoOrderDto } from 'src/dto/ventas/orders/createToGoOrder.dto';
import { updateToGoOrderDto } from 'src/dto/ventas/orders/updateToGoOrder.dto';
import { Branch } from 'src/schemas/business/branchSchema';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { ToGoOrder } from 'src/schemas/ventas/orders/toGoOrder.schema';
import { branchId } from 'src/variablesProvisionales';

@Injectable()
export class TogoOrderService {
  constructor(
    @InjectModel(ToGoOrder.name) private toGoOrderModel: Model<ToGoOrder>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
  ) {}

  async update(id: string, body: updateToGoOrderDto) {
    return await this.toGoOrderModel.findByIdAndUpdate(id, body, { new: true });
  }

  async create(body: createToGoOrderDto) {
    const session = await this.toGoOrderModel.startSession();
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

        // Método más preciso para obtener el último código
        const lastOrderInPeriod = await this.toGoOrderModel.aggregate([
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
        console.log(newOrderData);
        const newOrder = new this.toGoOrderModel(newOrderData);
        return newOrder.save();
      });
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, mas informacion: ${error}`,
      );
    }
  }

  async findAll() {
    return await this.toGoOrderModel.find();
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
