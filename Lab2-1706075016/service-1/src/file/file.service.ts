import { Injectable } from '@nestjs/common';
var JSZip = require('jszip');
var fs = require('fs');

@Injectable()
export class FileService {
  getFileAvailable() {
    return 'Available Files';
  }

  async compressFiles(files: Express.Multer.File[]) {
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.originalname, file.buffer);
    });
    zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream('out.zip'))
      .on('finish', function () {
        console.log('out.zip written.');
      });
  }
}
