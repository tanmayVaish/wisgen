import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/users/user.provider';
import { MailgunModule } from '@nextnm/nestjs-mailgun';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    MailgunModule.forAsyncRoot({
      useFactory: async () =>
        ({
          username: 'tanmayvaish.me',
          key: 'key-b84e13eb7063c3eca1b142d281163b2b',
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
