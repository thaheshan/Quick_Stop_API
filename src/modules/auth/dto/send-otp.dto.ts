import { IsString, Matches } from 'class-validator';

/**
 * POST /auth/otp/send
 *
 * Accepts Sri Lankan mobile numbers in any common format:
 *   07x xxxxxxx        — local
 *   +94 7x xxxxxxx     — E.164
 *   0094 7x xxxxxxx    — international prefix variant
 *
 * The service normalises whichever format is received to E.164 (+94xxxxxxxxx).
 */
export class SendOtpDto {
  /**
   * Sri Lankan mobile number.
   * Regex accepts:
   *   - 07XXXXXXXX        (10 digits starting with 07)
   *   - +947XXXXXXXX      (E.164 with +94)
   *   - 00947XXXXXXXX     (international with 0094)
   */
  @IsString()
  @Matches(/^(?:\+94|0094|0)7[0-9]{8}$/, {
    message:
      'phone must be a valid Sri Lankan mobile number ' +
      '(e.g. 0771234567, +94771234567)',
  })
  phone: string;
}
