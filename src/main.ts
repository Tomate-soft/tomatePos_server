import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

import { machineIdentifier } from './utils/chargeFiles/excel/machineIdentifier';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

  app.enableCors({
    origin: [
      'https://tomate-pos.vercel.app',
      'https://tomate-ksuxm5zwf-tomatepvs-projects.vercel.app',
      'http://localhost:5174',
      'http://localhost:5173',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 8000);
}
machineIdentifier();
bootstrap();
// update
