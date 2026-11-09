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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let BookingsService = class BookingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    postTripRequest(customerId, dto) {
        return this.prisma.tripRequest.create({
            data: { customerId, ...dto },
        });
    }
    listOpenRequests(location) {
        return this.prisma.tripRequest.findMany({
            where: {
                status: 'OPEN',
                ...(location && { location: { contains: location, mode: 'insensitive' } }),
            },
            include: { customer: { select: { id: true, fullName: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    submitOffer(ownerId, dto) {
        return this.prisma.broadcastOffer.create({
            data: { ownerId, ...dto },
        });
    }
    async acceptOffer(offerId, customerId) {
        const offer = await this.prisma.broadcastOffer.findUnique({
            where: { id: offerId },
            include: { request: true },
        });
        if (!offer)
            throw new common_1.NotFoundException('Offer not found');
        if (offer.request.customerId !== customerId)
            throw new common_1.BadRequestException('Not your request');
        await this.prisma.$transaction([
            this.prisma.broadcastOffer.update({ where: { id: offerId }, data: { status: 'ACCEPTED' } }),
            this.prisma.broadcastOffer.updateMany({
                where: { requestId: offer.requestId, id: { not: offerId } },
                data: { status: 'DECLINED' },
            }),
            this.prisma.tripRequest.update({
                where: { id: offer.requestId },
                data: { status: 'FULFILLED' },
            }),
        ]);
        return { success: true, offerId };
    }
    getMyRequests(customerId) {
        return this.prisma.tripRequest.findMany({
            where: { customerId },
            include: { offers: { include: { vehicle: true, owner: { select: { id: true, fullName: true } } } } },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map