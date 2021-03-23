import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('CRUD_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Welcome to service 2!';
  }

  uploadFile(urlFile: string) {
    console.log(urlFile);
    return {
      fileName: 'test',
      urlFile: '/festes/ets',
    };
  }

  sendMetadata(metadata: any) {
    return this.client.send('save_metadata', metadata);
  }
}
