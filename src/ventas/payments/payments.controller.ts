import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from 'src/dto/ventas/payments/createPaymentDto';
import { UpdatePaymentDto } from 'src/dto/ventas/payments/updatePaymentDto';
import { BillsService } from '../bills/bills.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private paymentService: PaymentsService,
    private billService: BillsService,
  ) {}

  @Get()
  async findAll() {
    try {
      const paymentsArray = await this.paymentService.findAll();
      if (!paymentsArray) {
        throw new NotFoundException('No se encuentran registros de pagos');
      }
      return paymentsArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get('current')
  async findCurrent() {
    try {
      const paymentsArray = await this.paymentService.findCurrent();
      if (!paymentsArray) {
        throw new NotFoundException('No se encuentran registros de pagos');
      }
      return paymentsArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const selectedPayment = await this.paymentService.findOne(id);
      if (!selectedPayment) {
        throw new NotFoundException('El pago que intentas encontrar no existe');
      }
      return selectedPayment;
    } catch (error) {}
  }

  @Post()
  async create(@Body() body: CreatePaymentDto) {
    try {
      const newPayment = await this.paymentService.create(body);

      return newPayment;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Esta nota ya fue pagada');
      }
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const deletedPayment = await this.paymentService.delete(id);
      if (!deletedPayment) {
        throw new NotFoundException('No existe el pago');
      }
      return deletedPayment;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePaymentDto) {
    try {
      const updatedPayment = await this.paymentService.update(id, body);
      if (!updatedPayment) {
        throw new NotFoundException('No existe el pago');
      }
      return updatedPayment;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Post('p/note/:id')
  async paymentNote(
    @Param('id') id: string,
    @Body() body: { accountId: string; body: CreatePaymentDto },
  ) {
    try {
      const payNote = await this.paymentService.paymentNote(id, body);
      if (!payNote) {
        throw new NotFoundException('No se completo al pago de la nota');
      }
      return payNote;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, no se pudo completar el pago, mas informacion: ${error}`,
      );
    }
  }

  @Post('togo/pay')
  async paymentToGo(
    @Body()
    data: {
      waiterId: any;
      body: any;
    },
  ) {
    try {
      const payToGo = await this.paymentService.paymentToGo(data);
      if (!payToGo) {
        throw new NotFoundException('No se completo el pago a domicilio');
      }
      return payToGo;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, no se pudo completar el pago, mas informacion: ${error}`,
      );
    }
  }

  @Post('rappi/pay')
  async paymentRappi(
    @Body()
    data: {
      waiterId: any;
      body: any;
    },
  ) {
    try {
      const payToGo = await this.paymentService.paymentRappiService(data);

      if (!payToGo) {
        throw new NotFoundException('No se completo el pago a domicilio');
      }
      return payToGo;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, no se pudo completar el pago, mas informacion: ${error}`,
      );
    }
  }

  @Post('phone/pay')
  async paymentPhone(
    @Body()
    data: {
      waiterId: any;
      body: any;
    },
  ) {
    try {
      const payPhone = await this.paymentService.paymentPhoneOrder(data);
      if (!payPhone) {
        throw new NotFoundException('No se completo el pago a domicilio');
      }
      return payPhone;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, no se pudo completar el pago, mas informacion: ${error}`,
      );
    }
  }

  @Post('pay/tips/:id')
  async payTips(@Param('id') id: string, @Body() body: any) {
    try {
      const payTip = await this.paymentService.paymentTips(id, body);
      if (!payTip) {
        throw new NotFoundException('No se pudo completar el pago de propinas');
      }
      return payTip;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, no se pudo completar el pago, mas informacion: ${error}`,
      );
    }
  }
  @Get('current')
  async getPaymentsCurrent() {
    try {
      const currentPayments = await this.paymentService.getCurrentPayments();
      if (!currentPayments) {
        throw new NotFoundException('No se encuentran pagos actuales');
      }
      return currentPayments;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }
}
