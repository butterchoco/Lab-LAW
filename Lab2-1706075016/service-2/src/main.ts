import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { upload_host } from './config';

async function bootstrap() {
  const port: number = Number(process.env.PORT) || 8002;
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: upload_host,
      port: 8082,
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(port);
  Logger.log('Uploading microservice running at ' + port);
}
bootstrap();
