import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port: number = Number(process.env.PORT) || 8001;
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 8081 },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(port);
  Logger.log('Compression microservice running');
}
bootstrap();
