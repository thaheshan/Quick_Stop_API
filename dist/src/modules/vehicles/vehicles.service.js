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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let VehiclesService = class VehiclesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(ownerId, dto) {
        return this.prisma.vehicle.create({
            data: { ...dto, ownerId },
        });
    }
    findAll(filters) {
        return this.prisma.vehicle.findMany({
            where: {
                status: 'ACTIVE',
                isVerified: true,
                ...(filters.location && { location: { contains: filters.location, mode: 'insensitive' } }),
                ...(filters.type && { type: filters.type }),
            },
            include: { pricingRules: true },
        });
    }
    async findOne(id) {
        const v = await this.prisma.vehicle.findUnique({ where: { id }, include: { pricingRules: true } });
        if (!v)
            throw new common_1.NotFoundException('Vehicle not found');
        return v;
    }
    findByOwner(ownerId) {
        return this.prisma.vehicle.findMany({ where: { ownerId }, include: { pricingRules: true } });
    }
    addPricingRule(vehicleId, dto) {
        return this.prisma.pricingRule.create({ data: { vehicleId, ...dto } });
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map