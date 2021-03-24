import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import JsZip from 'jszip';
var JSZip = require('jszip');

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
    const zip: JsZip = new JSZip();
    files.forEach((file) => {
      zip.file(file.originalname, file.buffer);
    });
    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      streamFiles: true,
    });
    const tempFile = {
      fieldname: 'file',
      size: zipBuffer.length,
      buffer: JSON.stringify(zipBuffer),
      originalname:
        'example' + new Date().toISOString().split(':').join('.') + '.zip',
    };
    return this.client.send('/file/upload', tempFile);
  }
}
