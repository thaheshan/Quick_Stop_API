"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = generateOtp;
exports.hashOtp = hashOtp;
exports.verifyOtp = verifyOtp;
exports.normaliseToE164 = normaliseToE164;
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const OTP_DIGITS = 6;
const BCRYPT_ROUNDS = 10;
function generateOtp() {
    const code = crypto.randomInt(0, 10 ** OTP_DIGITS);
    return code.toString().padStart(OTP_DIGITS, '0');
}
function hashOtp(plainCode) {
    return bcrypt.hash(plainCode, BCRYPT_ROUNDS);
}
function verifyOtp(plainCode, hash) {
    return bcrypt.compare(plainCode, hash);
}
function normaliseToE164(phone) {
    const digits = phone.replace(/\s|-/g, '');
    if (digits.startsWith('+94'))
        return digits;
    if (digits.startsWith('0094'))
        return '+94' + digits.slice(4);
    if (digits.startsWith('0'))
        return '+94' + digits.slice(1);
    return '+94' + digits;
}
//# sourceMappingURL=otp.util.js.map