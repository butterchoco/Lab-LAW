import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { crud_host } from './config';

async function bootstrap() {
  const port: number = Number(process.env.PORT) || 8003;
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: crud_host, port: 8083 },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(port);
  Logger.log('CRUD microservice running at ' + port);
}
bootstrap();
