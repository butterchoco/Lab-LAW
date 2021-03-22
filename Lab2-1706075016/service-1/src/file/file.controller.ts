import { Controller, Get } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private readonly fileService : FileService) {}

    @Get()
    getFileAvailable() {
        return this.fileService.getFileAvailable();
    }
}
