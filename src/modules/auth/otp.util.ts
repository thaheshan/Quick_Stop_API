import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

/** How many digits the OTP has */
const OTP_DIGITS = 6;

/** bcrypt salt rounds — low intentionally; OTPs are short-lived throwaway values */
const BCRYPT_ROUNDS = 10;

/**
 * Generates a cryptographically random 6-digit OTP string.
 * Uses crypto.randomInt to avoid modulo bias.
 *   Range: 000000 – 999999 (zero-padded)
 */
export function generateOtp(): string {
  const code = crypto.randomInt(0, 10 ** OTP_DIGITS);
  return code.toString().padStart(OTP_DIGITS, '0');
}

/**
 * Hashes the OTP using bcrypt so the stored value is never plaintext.
 * Even if the otp_records table is compromised an attacker cannot reverse codes.
 */
export function hashOtp(plainCode: string): Promise<string> {
  return bcrypt.hash(plainCode, BCRYPT_ROUNDS);
}

/**
 * Verifies a submitted code against a stored bcrypt hash.
 * Used by the future /auth/otp/verify endpoint.
 */
export function verifyOtp(plainCode: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainCode, hash);
}

/**
 * Normalises a Sri Lankan mobile number to E.164 format (+94XXXXXXXXX).
 *
 * Handles:
 *   07XXXXXXXX   →  +947XXXXXXXX
 *   +947XXXXXXXX →  +947XXXXXXXX  (passthrough)
 *   00947XXXXXXXX → +947XXXXXXXX
 */
export function normaliseToE164(phone: string): string {
  const digits = phone.replace(/\s|-/g, ''); // strip spaces/dashes

  if (digits.startsWith('+94'))  return digits;
  if (digits.startsWith('0094')) return '+94' + digits.slice(4);
  if (digits.startsWith('0'))    return '+94' + digits.slice(1);

  // Already bare 9-digit national number without leading zero
  return '+94' + digits;
}
