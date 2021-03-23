import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

interface FileData {
  fileName: string;
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
      const metadataFile: any = await this.appService.uploadFile(data.fileName);
      if (!metadataFile) {
        throw new HttpException(
          'Upload tidak berhasil',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
      return this.appService.sendMetadata(metadataFile);
    } else {
      throw new HttpException('Form tidak valid', HttpStatus.BAD_REQUEST);
    }
  }

  @MessagePattern('getDownloadLink')
  async getDownloadLink(urlFile: string) {
    if (urlFile) {
      const metadataFile: any = await this.appService.getDownloadLink(urlFile);
      return metadataFile;
    } else {
      throw new HttpException('Form tidak valid', HttpStatus.BAD_REQUEST);
    }
  }
}
