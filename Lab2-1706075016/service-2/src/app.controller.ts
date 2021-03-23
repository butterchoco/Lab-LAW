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

  @MessagePattern('save')
  saveFile(data: any) {
    console.log('masuk');
    if (data) {
      console.log(data);
      return 'Success';
    } else {
      return 'Failed';
    }
  }
}
