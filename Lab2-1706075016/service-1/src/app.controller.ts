import {
  Controller,
  Get,
  HttpService,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private http: HttpService,
  ) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('auth')
  async getAuthenticate(@Query('client_id') clientId: string, @Res() res) {
    const { config } = await this.http
      .get(
        `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/auth/github&scope=identify`,
      )
      .toPromise();
    res.redirect(config.url);
  }

  @Get('auth/get-token')
  async getToken(
    @Query('client_id') clientId: string,
    @Query('client_secret') clientSecret: string,
    @Query('code') code: string,
  ) {
    const { data } = await this.http
      .post(
        `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
      )
      .toPromise();

    return data;
    // return { accessToken, refreshToken };
  }
}
