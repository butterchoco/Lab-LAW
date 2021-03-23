import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to service 3!';
  }

  uploadFile(file: File) {}
}
