import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { MetadataService } from './metadata.service';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get()
  getAllMetadata() {
    return this.metadataService.getAllMetadata();
  }

  @Post('create')
  @MessagePattern('metadata/create')
  saveMetadata(@Body('data') data: { name: string; url: string }) {
    console.log(data);
    if (data && data.name && data.url) {
      return this.metadataService.saveMetadata(data);
    } else {
      throw new HttpException('Form tidak valid', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update')
  updateMetadata(@Body('data') data: { id: string; name: string }) {
    if (data && data.id && data.name) {
      return this.metadataService.updateMetadata({
        where: { id: Number(data.id) },
        data: { name: data.name },
      });
    } else {
      throw new HttpException('Form tidak valid', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete')
  deleteMetadata(@Body('data') data: { id: string }) {
    if (data && data.id) {
      return this.metadataService.deleteMetadata({ id: Number(data.id) });
    } else {
      throw new HttpException('Form tidak valid', HttpStatus.BAD_REQUEST);
    }
  }
}
