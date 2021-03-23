import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { compression_host } from './config';

async function bootstrap() {
  const port: number = Number(process.env.PORT) || 8001;
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: compression_host,
      port: 8081,
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });
  await app.startAllMicroservicesAsync();
  app.enableCors();
  await app.listen(port);
  Logger.log('Compression microservice running at ' + port);
}
bootstrap();
