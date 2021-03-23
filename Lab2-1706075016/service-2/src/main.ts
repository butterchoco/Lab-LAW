import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port: number = Number(process.env.PORT) || 8002;
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 8082 },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(port);
  Logger.log('Saving microservice running');
}
bootstrap();
