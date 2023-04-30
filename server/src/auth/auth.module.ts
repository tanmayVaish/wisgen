import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/users/user.provider';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    MailgunModule.forAsyncRoot({
      useFactory: async () =>
        ({
          username: process.env.MAILGUN_USERNAME,
          key: process.env.MAILGUN_API_KEY,
          // public_key: 'string', // OPTIONAL
          // timeout: 'number', // OPTIONAL
          // url: 'string', // OPTIONAL // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
        } as any),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders],
})
export class AuthModule {}
