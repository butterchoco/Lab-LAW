import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  getFileAvailable() {
    return this.fileService.getFileAvailable();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    if (files) {
      return this.fileService.compressFiles(files);
    } else {
      throw new HttpException('Form tidak valid', HttpStatus.BAD_REQUEST);
    }
  }
}
