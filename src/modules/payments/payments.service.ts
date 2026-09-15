import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService }  from '../../common/prisma/prisma.service';
import { calcCommission, calcOwnerPayout } from '../../common/utils/currency.util';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  /** Initiate payment for an accepted offer */
  async initiate(offerId: string, userId: string) {
    const offer = await this.prisma.broadcastOffer.findUnique({ where: { id: offerId } });
    if (!offer) throw new NotFoundException('Offer not found');

    const commissionLKR  = calcCommission(offer.proposedPriceLKR);
    const ownerPayoutLKR = calcOwnerPayout(offer.proposedPriceLKR);

    return this.prisma.payment.create({
      data: {
        offerId,
        userId,
        amountLKR:      offer.proposedPriceLKR,
        commissionLKR,
        ownerPayoutLKR,
        status:         'PENDING',
      },
    });
  }

  /** Verify & complete payment (called after gateway callback) */
  async verify(paymentId: string, gatewayRef: string) {
    return this.prisma.payment.update({
      where: { id: paymentId },
      data:  { status: 'COMPLETED', gatewayRef },
    });
  }

  getMyPayments(userId: string) {
    return this.prisma.payment.findMany({
      where:   { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
