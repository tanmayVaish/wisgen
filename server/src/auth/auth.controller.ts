import {
  Controller,
  Post,
  Body,
  HttpCode,
  ValidationPipe,
  UsePipes,
  Res,
} from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() body: registerDto) {
    const user = await this.authService.register(body);
    return user;
  }

  @HttpCode(200)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() body: loginDto, @Res({ passthrough: true }) res: any) {
    const user = await this.authService.login(body);

    return user;
  }

  @Post('verify')
  async verify(
    @Body('token') token: string,
    @Res({ passthrough: true }) res: any,
  ) {
    const user = await this.authService.verifyEmail(token);
    res.cookie('token', user.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return user;
  }
}
