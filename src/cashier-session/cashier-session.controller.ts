import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CashierSessionService } from './cashier-session.service';
import { updateCashierSessionDto } from 'src/dto/cashierSession/updateCashierSession';
import { createCashierSessionDto } from 'src/dto/cashierSession/createCashierSession';
import { createCashWithdrawDto } from 'src/dto/cashierSession/cashWithdraw/createCashWithdraw';

@Controller('cashier-session')
export class CashierSessionController {
  constructor(private cashierSessionService: CashierSessionService) {}

  @Get()
  async findAll() {
    try {
      const sessionArray = await this.cashierSessionService.findAll();
      if (!sessionArray) {
        throw new NotFoundException(`No se pudo cargar ninguna session`);
      }
      return sessionArray;
    } catch (error) {
      throw new NotFoundException(
        ` Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const currentSession = await this.cashierSessionService.findOne(id);
      if (!currentSession) {
        throw new NotFoundException(`No se encontro esta session. ${id}`);
      }
      return currentSession;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const deletedSession = await this.cashierSessionService.delete(id);
      if (!deletedSession) {
        throw new NotFoundException(`No se pudo eleminar la session`);
      }
      return deletedSession;
    } catch (error) {
      throw new NotFoundException(
        ` Ha ocurrido algo inesperado, Mas información: ${error}`,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: updateCashierSessionDto) {
    try {
      const updatedSession = await this.cashierSessionService.update(id, body);
      if (!updatedSession) {
        throw new NotFoundException(
          `No se encontro la session que deseas actualizar`,
        );
      }
      return updatedSession;
    } catch (error) {
      throw new NotFoundException(`Ha ocurrido algo inesperado, ${error}`);
    }
  }

  @Post()
  async create(@Body() body: createCashierSessionDto) {
    console.log('entra a crear la session');
    console.log(body);
    try {
      const newSession = await this.cashierSessionService.create(body);
      console.log('depoues de crear la session');
      console.log(newSession);
      return newSession;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Esta se session ya se encuentra activa. ${error}`,
        );
      }
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Put('payment/:id')
  async updateBillForPayment(
    @Param('id') id: string,
    @Body() body: updateCashierSessionDto,
  ) {
    try {
      const updatedData = await this.cashierSessionService.updateBillForPayment(
        id,
        body,
      );
      if (!updatedData) {
        throw new NotFoundException('No se pudo actualizar');
      }
      return updatedData;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inepserado, mas informacion: ${error}`,
      );
    }
  }

  @Post('/cash-withdrawal')
  async cashWithdrawal(@Body() body: createCashWithdrawDto) {
    console.log('LLegue al metodo adecuado con la data:');
    console.log(body);
    try {
      const withdrawal = await this.cashierSessionService.cashWithdrawal(body);
      return withdrawal;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, mas informacion: ${error}`,
      );
    }
  }

  @Put('pause/resume/:id')
  async pauseResume(@Param('id') id: string) {
    try {
      const updatedData = await this.cashierSessionService.pauseResume(id);
      if (!updatedData) {
        throw new NotFoundException('No se pudo actualizar');
      }
      return updatedData;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, mas informacion: ${error}`,
      );
    }
  }
}
