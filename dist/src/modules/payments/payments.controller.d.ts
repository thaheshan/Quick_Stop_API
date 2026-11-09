import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private svc;
    constructor(svc: PaymentsService);
    initiate(offerId: string, user: any): Promise<{
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
    verify(id: string, gatewayRef: string): Promise<{
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
    myPayments(user: any): import(".prisma/client").Prisma.PrismaPromise<{
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
