import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('save_metadata')
  save_metadata(data: any) {
    console.log(data);
    if (data) {
      return 'Success';
    } else {
      return 'Failed';
    }
  }
}
