import { UsersService } from './users.service';
export declare class UsersController {
    private svc;
    constructor(svc: UsersService);
    profile(user: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        phone: string;
        fullName: string;
        isVerifiedOwner: boolean;
        hasVerifiedLicense: boolean;
        isPhoneVerified: boolean;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(user: any, body: {
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
