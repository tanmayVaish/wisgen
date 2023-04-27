import {
  Controller,
  Post,
  Body,
  HttpCode,
  ValidationPipe,
  UsePipes,
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
  async login(@Body() body: loginDto) {
    const user = await this.authService.login(body);
    return user;
  }
}
