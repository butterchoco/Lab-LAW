import { MetadataFile, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Welcome to service 3!';
  }

  saveMetadata(
    metadata: Prisma.MetadataFileCreateInput,
  ): Promise<MetadataFile> {
    return this.prisma.metadataFile.create({ data: metadata });
  }
}
