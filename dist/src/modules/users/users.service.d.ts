import { PrismaService } from '../../common/prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        phone: string;
        fullName: string;
        isVerifiedOwner: boolean;
        hasVerifiedLicense: boolean;
        isPhoneVerified: boolean;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateProfile(userId: string, data: {
        fullName?: string;
    }): import(".prisma/client").Prisma.Prisma__UserClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
