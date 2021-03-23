import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import JSZip = require('jszip');

@Injectable()
export class FileService {
  constructor(
    @Inject('UPLOAD_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  getFileAvailable() {
    return 'Available Files';
  }

  async compressFiles(files: Express.Multer.File[]) {
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.originalname, file.buffer);
    });
    const result = await zip.generateAsync({ type: 'nodebuffer' });
    return this.client.send('upload', { file: result });
  }
}
