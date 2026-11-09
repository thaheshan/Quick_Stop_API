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
exports.ShopsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const DEFAULT_AREA = 'Colombo 03';
const CACHE_TTL_MS = 5 * 60 * 1_000;
let ShopsService = class ShopsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.cache = new Map();
    }
    async getCount(params) {
        const resolvedArea = this.resolveArea(params);
        const cacheKey = resolvedArea.toLowerCase().trim();
        const cached = this.cache.get(cacheKey);
        if (cached && cached.expiresAt > Date.now()) {
            return { area: resolvedArea, count: cached.count, cached: true };
        }
        const count = await this.prisma.vehicle.count({
            where: {
                status: 'ACTIVE',
                isVerified: true,
                location: {
                    contains: resolvedArea,
                    mode: 'insensitive',
                },
            },
        });
        this.cache.set(cacheKey, {
            count,
            expiresAt: Date.now() + CACHE_TTL_MS,
        });
        return { area: resolvedArea, count, cached: false };
    }
    resolveArea(params) {
        if (params.area) {
            return params.area.trim();
        }
        if (params.lat && params.lng) {
            const lat = parseFloat(params.lat).toFixed(2);
            const lng = parseFloat(params.lng).toFixed(2);
            return `${lat},${lng}`;
        }
        return DEFAULT_AREA;
    }
};
exports.ShopsService = ShopsService;
exports.ShopsService = ShopsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShopsService);
//# sourceMappingURL=shops.service.js.map