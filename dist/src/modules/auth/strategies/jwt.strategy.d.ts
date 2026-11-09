import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../../common/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<{
        id: string;
        email: string;
        phone: string;
        fullName: string;
        passwordHash: string;
        isVerifiedOwner: boolean;
        hasVerifiedLicense: boolean;
        isPhoneVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
export {};
