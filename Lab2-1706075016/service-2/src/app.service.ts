import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
const dropboxV2Api = require('dropbox-v2-api');
const fs = require('fs');

@Injectable()
export class AppService {
  constructor(
    @Inject('CRUD_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Welcome to service 2!';
  }

  async uploadFile(fileName: string) {
    const token =
      'RUEs-BgrPEEAAAAAAAAAAazfoiO8tiSjfsBmeIasHzK9YpUPI2edGeO2rTz9Skqs';
    const dropbox = dropboxV2Api.authenticate({
      token,
    });

    const basePath = '../temp/';

    const uploadStream = new Promise((resolve, reject) => {
      dropbox(
        {
          resource: 'files/upload',
          parameters: {
            path: '/dropbox/' + fileName,
          },
          readStream: fs.createReadStream(basePath + fileName),
        },
        (err: any, result: any, _) => {
          if (err) {
            reject(null);
          } else {
            fs.rmdirSync(basePath, { recursive: true });
            resolve({
              id: result.id,
              name: result.name,
              url: result.path_display,
              created_at: new Date().toISOString(),
            });
          }
        },
      );
    });
    const metadata = await uploadStream
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
    return metadata;
  }

  sendMetadata(metadata: any) {
    return this.client.send('save_metadata', metadata);
  }
}
