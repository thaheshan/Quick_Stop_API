import { PrismaService } from '../../common/prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    initiate(offerId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: string;
        amountLKR: number;
        commissionLKR: number;
        ownerPayoutLKR: number;
        gatewayRef: string | null;
        offerId: string;
    }>;
    verify(paymentId: string, gatewayRef: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: string;
        amountLKR: number;
        commissionLKR: number;
        ownerPayoutLKR: number;
        gatewayRef: string | null;
        offerId: string;
    }>;
    getMyPayments(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: string;
        amountLKR: number;
        commissionLKR: number;
        ownerPayoutLKR: number;
        gatewayRef: string | null;
        offerId: string;
    }[]>;
}
