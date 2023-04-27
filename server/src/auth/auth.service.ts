import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: registerDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      throw new HttpException('User Already Exists!', HttpStatus.BAD_REQUEST);
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(body.password, saltOrRounds);

    const user = await this.userRepository.create({
      ...body,
      password: hash,
    });
    await this.userRepository.save(user);

    return user;
  }

  async login(body: loginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid Credentials!', HttpStatus.BAD_REQUEST);
    }

    // TODO: create jwt token and assign to cookie

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login Successful!',
      access_token: token,
    };
  }
}
