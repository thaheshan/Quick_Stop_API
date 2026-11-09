import { PrismaService } from '../../common/prisma/prisma.service';
export declare class OtpService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    sendOtp(rawPhone: string): Promise<{
        requestId: string;
    }>;
    private dispatchSms;
}
