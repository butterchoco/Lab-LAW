import { MetadataFile, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MetadataService {
  constructor(private prisma: PrismaService) {}

  saveMetadata(
    metadata: Prisma.MetadataFileCreateInput,
  ): Promise<MetadataFile> {
    return this.prisma.metadataFile.create({ data: metadata });
  }

  getAllMetadata(): Promise<MetadataFile[]> {
    return this.prisma.metadataFile.findMany();
  }

  async updateMetadata(params: {
    where: Prisma.MetadataFileWhereUniqueInput;
    data: Prisma.MetadataFileUpdateInput;
  }): Promise<MetadataFile> {
    const { data, where } = params;
    return this.prisma.metadataFile.update({
      data,
      where,
    });
  }

  async deleteMetadata(
    where: Prisma.MetadataFileWhereUniqueInput,
  ): Promise<MetadataFile> {
    return this.prisma.metadataFile.delete({
      where,
    });
  }
}
