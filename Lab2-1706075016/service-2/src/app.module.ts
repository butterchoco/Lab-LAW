import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { crud_host } from './config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CRUD_SERVICE',
        transport: Transport.TCP,
        options: {
          host: crud_host,
          port: 8083,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
