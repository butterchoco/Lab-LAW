import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
var JSZip = require('jszip');
var fs = require('fs');

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
    const zip: typeof JSZip = new JSZip();
    const basePath = '../temp/';
    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);
    let zipName = 'example';
    files.forEach((file) => {
      console.log(file);
      zip.file(file.originalname, file.buffer);
    });
    zipName =
      zipName + '_' + new Date().toISOString().split(':').join('-') + '.zip';
    const urlFile = basePath + zipName;
    zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream(urlFile));
    return this.client.send('upload', { zipName });
  }
}
