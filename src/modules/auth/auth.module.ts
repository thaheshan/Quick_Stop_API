import { Module }         from '@nestjs/common';
import { JwtModule }      from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService }    from './auth.service';
import { OtpService }     from './otp.service';
import { AuthController } from './auth.controller';
import { JwtStrategy }    from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret:      process.env.JWT_SECRET ?? 'dev-secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' },
    }),
  ],
  providers:   [AuthService, OtpService, JwtStrategy],
  controllers: [AuthController],
  exports:     [AuthService, OtpService],
})
export class AuthModule {}
