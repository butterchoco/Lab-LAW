import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  getFileAvailable() {
    return 'Available Files';
  }
}
