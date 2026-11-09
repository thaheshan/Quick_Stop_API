import { AuthService } from './auth.service';
import { OtpService } from './otp.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SendOtpDto } from './dto/send-otp.dto';
export declare class AuthController {
    private readonly authSvc;
    private readonly otpSvc;
    constructor(authSvc: AuthService, otpSvc: OtpService);
    register(dto: RegisterDto): Promise<{
        user: any;
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: any;
        token: string;
    }>;
    sendOtp(dto: SendOtpDto): Promise<{
        success: boolean;
        message: string;
        requestId: string;
    }>;
}
