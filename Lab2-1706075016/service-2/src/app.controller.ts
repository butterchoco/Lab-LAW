import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

interface FileData {
  urlFile: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('upload')
  async uploadFile(data: FileData) {
    if (data) {
      const metadataFile = await this.appService.uploadFile(data.urlFile);
      return this.appService.sendMetadata(metadataFile);
    } else {
      return 'Failed';
    }
  }
}
