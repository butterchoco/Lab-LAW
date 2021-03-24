import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getDownloadLink(@Query('id') id: string, @Res() res: Response) {
    if (id) {
      const data = await this.appService.getBufferData({ id: Number(id) });
      const buffer = Buffer.from(JSON.parse(data.buffer));
      res.set('Content-Type', 'application/zip');
      res.set('Content-Disposition', `attachment; filename=${data.name}`);
      res.set('Content-Length', buffer.length.toString());
      res.send(buffer);
    } else {
      return this.appService.getHello();
    }
  }

  @Post('/file/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileHTTP(@UploadedFile() file: Express.Multer.File) {
    const tempFile = {
      fieldname: file.fieldname,
      size: file.size,
      originalname: file.originalname,
      buffer: JSON.stringify(file.buffer),
    };
    return this.appService.uploadHelper(tempFile);
  }

  @MessagePattern('/file/upload')
  async uploadFile(file: {
    fieldname: string;
    size: Number;
    originalname: string;
    buffer: string;
  }) {
    console.log(file);
    return this.appService.uploadHelper(file);
  }
}
