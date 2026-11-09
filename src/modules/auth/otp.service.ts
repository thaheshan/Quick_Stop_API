import { Injectable, Logger } from '@nestjs/common';
import { PrismaService }      from '../../common/prisma/prisma.service';
import { generateOtp, hashOtp, normaliseToE164 } from './otp.util';

/** OTP validity window in minutes */
const OTP_TTL_MINUTES = 5;

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Core flow for BE-3.1 Send OTP:
   *
   * 1. Normalise the phone number to E.164.
   * 2. Invalidate (mark used=true) any existing, unexpired OTP for that number.
   * 3. Generate a fresh 6-digit OTP and hash it.
   * 4. Persist the OtpRecord with a 5-minute expiry.
   * 5. Dispatch the code (stub → replace with SMS gateway in production).
   * 6. Return a generic success response + requestId (never the code).
   *
   * The response is deliberately identical whether the number is registered
   * or not, preventing user enumeration.
   */
  async sendOtp(rawPhone: string): Promise<{ requestId: string }> {
    const phone = normaliseToE164(rawPhone);

    // ── 1. Invalidate any live OTPs for this number ───────────────────────────
    await this.prisma.otpRecord.updateMany({
      where: {
        phone,
        used:      false,
        expiresAt: { gt: new Date() },
      },
      data: { used: true },
    });

    // ── 2. Generate & hash a fresh 6-digit OTP ────────────────────────────────
    const plainCode = generateOtp();
    const codeHash  = await hashOtp(plainCode);

    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1_000);

    // ── 3. Persist the OTP record ─────────────────────────────────────────────
    const record = await this.prisma.otpRecord.create({
      data: { phone, codeHash, expiresAt },
    });

    // ── 4. Dispatch OTP via SMS ───────────────────────────────────────────────
    await this.dispatchSms(phone, plainCode);

    this.logger.log(`OTP issued | phone=${phone} | requestId=${record.requestId}`);

    // ── 5. Return generic response (no code, no user info) ───────────────────
    return { requestId: record.requestId };
  }

  // ─── SMS dispatch ────────────────────────────────────────────────────────────
  /**
   * SMS gateway stub.
   *
   * In development: logs the OTP to the console (NODE_ENV !== 'production').
   * In production:  integrate your SMS provider here (e.g. Twilio, Vonage, Dialog).
   *
   * Replace the body of this method with a real provider call when ready.
   * The rest of the service does not change.
   */
  private async dispatchSms(phone: string, code: string): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      // ⚠️  DEV ONLY — never log OTPs in production
      this.logger.warn(`[DEV] OTP for ${phone} → ${code}`);
      return;
    }

    // TODO: replace with real SMS provider
    // Example (Twilio):
    //   await this.twilioClient.messages.create({
    //     to:   phone,
    //     from: process.env.TWILIO_FROM_NUMBER,
    //     body: `Your Quick Stop verification code is ${code}. Valid for ${OTP_TTL_MINUTES} minutes.`,
    //   });
    this.logger.warn(`SMS gateway not configured — OTP NOT sent to ${phone}`);
  }
}
