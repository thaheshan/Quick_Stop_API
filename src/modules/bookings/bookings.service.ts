import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService }       from '../../common/prisma/prisma.service';
import { CreateTripRequestDto } from './dto/create-trip-request.dto';
import { CreateOfferDto }       from './dto/create-offer.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  /** Traveller posts a broadcast trip request */
  postTripRequest(customerId: string, dto: CreateTripRequestDto) {
    return this.prisma.tripRequest.create({
      data: { customerId, ...dto },
    });
  }

  /** List all open broadcast requests — owners browse these */
  listOpenRequests(location?: string) {
    return this.prisma.tripRequest.findMany({
      where: {
        status: 'OPEN',
        ...(location && { location: { contains: location, mode: 'insensitive' } }),
      },
      include: { customer: { select: { id: true, fullName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Owner submits competing offer on a broadcast */
  submitOffer(ownerId: string, dto: CreateOfferDto) {
    return this.prisma.broadcastOffer.create({
      data: { ownerId, ...dto },
    });
  }

  /** Traveller accepts one offer — declines all others automatically */
  async acceptOffer(offerId: string, customerId: string) {
    const offer = await this.prisma.broadcastOffer.findUnique({
      where: { id: offerId },
      include: { request: true },
    });
    if (!offer) throw new NotFoundException('Offer not found');
    if (offer.request.customerId !== customerId)
      throw new BadRequestException('Not your request');

    // Accept this offer, decline the rest
    await this.prisma.$transaction([
      this.prisma.broadcastOffer.update({ where: { id: offerId }, data: { status: 'ACCEPTED' } }),
      this.prisma.broadcastOffer.updateMany({
        where: { requestId: offer.requestId, id: { not: offerId } },
        data:  { status: 'DECLINED' },
      }),
      this.prisma.tripRequest.update({
        where: { id: offer.requestId },
        data:  { status: 'FULFILLED' },
      }),
    ]);

    return { success: true, offerId };
  }

  getMyRequests(customerId: string) {
    return this.prisma.tripRequest.findMany({
      where: { customerId },
      include: { offers: { include: { vehicle: true, owner: { select: { id: true, fullName: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
