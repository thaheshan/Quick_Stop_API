"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OtpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const otp_util_1 = require("./otp.util");
const OTP_TTL_MINUTES = 5;
let OtpService = OtpService_1 = class OtpService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(OtpService_1.name);
    }
    async sendOtp(rawPhone) {
        const phone = (0, otp_util_1.normaliseToE164)(rawPhone);
        await this.prisma.otpRecord.updateMany({
            where: {
                phone,
                used: false,
                expiresAt: { gt: new Date() },
            },
            data: { used: true },
        });
        const plainCode = (0, otp_util_1.generateOtp)();
        const codeHash = await (0, otp_util_1.hashOtp)(plainCode);
        const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1_000);
        const record = await this.prisma.otpRecord.create({
            data: { phone, codeHash, expiresAt },
        });
        await this.dispatchSms(phone, plainCode);
        this.logger.log(`OTP issued | phone=${phone} | requestId=${record.requestId}`);
        return { requestId: record.requestId };
    }
    async dispatchSms(phone, code) {
        if (process.env.NODE_ENV !== 'production') {
            this.logger.warn(`[DEV] OTP for ${phone} → ${code}`);
            return;
        }
        this.logger.warn(`SMS gateway not configured — OTP NOT sent to ${phone}`);
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = OtpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OtpService);
//# sourceMappingURL=otp.service.js.map