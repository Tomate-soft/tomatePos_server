import { Module } from '@nestjs/common';
import { XlsController } from './xls.controller';
import { XlsService } from './xls.service';

@Module({
  controllers: [XlsController],
  providers: [XlsService]
})
export class XlsModule {}
