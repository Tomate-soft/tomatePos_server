import { Module } from '@nestjs/common';
import { MachineIdentifierController } from './machine-identifier.controller';
import { MachineIdentifierService } from './machine-identifier.service';

@Module({
  controllers: [MachineIdentifierController],
  providers: [MachineIdentifierService]
})
export class MachineIdentifierModule {}
