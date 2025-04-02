import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';
@Injectable()
// When you will apply the AuthGuard @UseGuards(AuthGuard('bearer')) to the protected route.
// It will call the validate method from the ApiKeyStrategy
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(apiKey: string) {
    const user = await this.authService.validateUserByApiKey(apiKey);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
