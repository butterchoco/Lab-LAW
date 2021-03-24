import { Controller, Get,Req,UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('discord')
  @UseGuards(AuthGuard('github'))
  async getUserFromGithubLogin(@Req() req: any) {
    return req.user;
  }
}
