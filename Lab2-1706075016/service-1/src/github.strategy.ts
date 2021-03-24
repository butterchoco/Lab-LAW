import { PassportStrategy } from '@nestjs/passport';
import { HttpService, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private http: HttpService) {
    super({
      authorizationURL: 'https://github.com/login/oauth/authorize',
      tokenURL: 'https://github.com/login/oauth/access_token',
      clientID: 'a90b6e52fada1d08fcb1',
      clientSecret: '81c79f20964e23b70eb1603b50af6f48f54ad3a2',
      callbackURL: 'http://localhost:8001/auth/github',
      scope: 'identify',
    });
  }

  async validate(accessToken: string): Promise<any> {
    const { data } = await this.http
      .get('https://api.github.com/user', {
        headers: { Authorization: `token ${accessToken}` },
      })
      .toPromise();
    console.log(data);
    return data;
  }
}
