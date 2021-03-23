import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SAVING_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 8082,
        },
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
