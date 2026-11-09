import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpService }  from './otp.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto }    from './dto/login.dto';
import { SendOtpDto }  from './dto/send-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    private readonly otpSvc:  OtpService,
  ) {}

  /** POST /api/v1/auth/register */
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authSvc.register(dto);
  }

  /** POST /api/v1/auth/login */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authSvc.login(dto);
  }

  /**
   * POST /api/v1/auth/otp/send  — BE-3.1
   *
   * Public endpoint. Accepts a Sri Lankan mobile number, generates a
   * one-time 6-digit code, stores it hashed with a 5-minute expiry,
   * invalidates any previous live OTP for that number, and dispatches
   * it via SMS.
   *
   * Returns a generic 200 + requestId regardless of whether the number
   * is already registered — prevents user enumeration.
   */
  @Post('otp/send')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() dto: SendOtpDto) {
    const { requestId } = await this.otpSvc.sendOtp(dto.phone);
    return {
      success:   true,
      message:   'If this number is valid, an OTP has been sent.',
      requestId,
    };
  }
}
