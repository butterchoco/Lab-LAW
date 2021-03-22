import {
  Controller,
  Get,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post()
  getSum(
    @Body('a') a: string,
    @Body('b') b: string,
  ): { a: number; b: number; hasil: number } {
    const numericOnly: RegExp = new RegExp('^[0-9]*$');
    if (a && b && numericOnly.test(a) && numericOnly.test(b)) {
      return this.appService.getSum(parseInt(a), parseInt(b));
    } else {
      throw new HttpException('Form tidak valid', HttpStatus.BAD_REQUEST);
    }
  }
}
