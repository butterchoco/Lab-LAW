import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
const fetch = require('isomorphic-fetch');
import { Dropbox } from 'dropbox';
import { Prisma } from '@prisma/client';
import { upload_host, upload_port } from './config';
const Dropbox2 = require('dropbox').Dropbox;
import { PrismaService } from './prisma.service';

interface MetadataFile {
  name: string;
  id: Number;
  size: Number;
}

@Injectable()
export class AppService {
  constructor(
    @Inject('CRUD_SERVICE')
    private readonly client: ClientProxy,
    private prisma: PrismaService,
  ) {}

  getHello(): string {
    return 'Welcome to service 2!';
  }

  async uploadFile(file: { originalname: string; buffer: string }) {
    const temp = { name: file.originalname, buffer: file.buffer };
    const buffer: Buffer = Buffer.from(JSON.parse(file.buffer));
    const res = await this.prisma.fileUploaded.create({
      data: temp,
    });
    return {
      id: res.id,
      name: file.originalname,
      size: buffer.length,
    };
  }

  async getBufferData(
    fileUploadedWhereUniqueInput: Prisma.FileUploadedWhereUniqueInput,
  ) {
    return this.prisma.fileUploaded.findUnique({
      where: fileUploadedWhereUniqueInput,
    });
  }

  sendMetadata(metadata: any) {
    return this.client.send('save_metadata', metadata);
  }

  async uploadHelper(file: {
    fieldname: string;
    size: Number;
    originalname: string;
    buffer: string;
  }) {
    if (file) {
      const metadataFile: MetadataFile = await this.uploadFile(file);
      if (!metadataFile) {
        throw new HttpException(
          'Upload tidak berhasil',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
      console.log(metadataFile);
      const link = `${upload_host}:${upload_port}/?id=${metadataFile.id}`;
      this.client.emit('save_metadata', metadataFile);
      return { link };
    } else {
      throw new HttpException('Form tidak valid', HttpStatus.BAD_REQUEST);
    }
  }
}
