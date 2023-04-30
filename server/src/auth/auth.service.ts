import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailgunService, EmailOptions } from '@nextnm/nestjs-mailgun';
import * as process from 'process';
import constant from '../constant';

@Injectable()
export class AuthService {
  constructor(
    @Inject(constant.USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailgunService: MailgunService,
  ) {}

  async register(body: registerDto) {
    try {
      const existingUserEmail = await this.userRepository.findOne({
        where: {
          email: body.email,
        },
      });

      const existingUserMobile = await this.userRepository.findOne({
        where: {
          mobile: body.mobile,
        },
      });

      if (existingUserEmail) {
        return {
          message: 'Email Already Exists!',
          status: 'email_already_exists',
        };
      }

      if (existingUserMobile) {
        return {
          message: 'Mobile Number Already Exists!',
          status: 'mobile_already_exists',
        };
      }

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(body.password, saltOrRounds);

      const user = await this.userRepository.create({
        ...body,
        password: hash,
      });
      await this.userRepository.save(user);

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token: string = await this.jwtService.signAsync(payload);

      const originalUrl: string = process.env.ORIGIN_URL;
      const from: string = process.env.FROM_EMAIL;

      const options: EmailOptions = {
        from: from,
        to: user?.email,
        subject: 'Welcome to Wisgen!',
        text: `This is a verification email. Please verify your email by clicking on the link below. ${originalUrl}/verify?token=${token}`,
        html:
          '<h1>WELCOME TO Wisgen!</h1>' +
          '<p>This is a verification email. Please verify your email by clicking on the link below.</p>' +
          `<a href="${originalUrl}/verify?token=${token}">Verify Email</a>`,
        attachment: '',
      };

      const emailSent = await this.mailgunService.createEmail(
        'tanmayvaish.me',
        options,
      );

      return {
        message: 'User Registered Successfully!',
        status: 'user_registered',
      };
    } catch (e) {
      return e;
    }
  }

  async verifyEmail(verifyToken: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(verifyToken);

      const user = await this.userRepository.findOne({
        where: {
          email: decoded.email,
        },
      });

      if (!user) {
        throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
      }

      user.isVerified = true;

      await this.userRepository.save(user);

      const payload = {
        id: user.id,
        email: user.email,
      };

      const loginToken = await this.jwtService.signAsync(payload);

      return {
        message: 'Email Verified Successfully!',
        status: 'email_verified',
        access_token: loginToken,
      };
    } catch (e) {
      return {
        message: 'Invalid or Expired Token!',
        status: 'invalid_token',
      };
    }
  }

  async login(body: loginDto) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: body.email })
      .orWhere('user.mobile = :mobile', { mobile: body.email })
      .getOne();

    if (!user) {
      return {
        message: 'User Not Found!',
        status: 'user_not_found',
      };
    }

    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      return {
        message: 'Incorrect Password!',
        status: 'incorrect_password',
      };
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login Successful!',
      status: 'login_successful',
      access_token: token,
    };
  }
}
