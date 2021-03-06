import { HttpModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { upload_host } from '../config';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'UPLOAD_SERVICE',
        transport: Transport.TCP,
        options: {
          host: upload_host,
          port: 8082,
        },
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
