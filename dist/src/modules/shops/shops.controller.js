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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopsController = void 0;
const common_1 = require("@nestjs/common");
const shops_service_1 = require("./shops.service");
const shop_count_query_dto_1 = require("./dto/shop-count-query.dto");
let ShopsController = class ShopsController {
    constructor(shopsService) {
        this.shopsService = shopsService;
    }
    async getShopCount(query) {
        const result = await this.shopsService.getCount({
            area: query.area,
            lat: query.lat,
            lng: query.lng,
        });
        return {
            success: true,
            data: {
                area: result.area,
                count: result.count,
            },
            meta: {
                cached: result.cached,
                cacheTtlSeconds: 300,
            },
        };
    }
};
exports.ShopsController = ShopsController;
__decorate([
    (0, common_1.Get)('count'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shop_count_query_dto_1.ShopCountQueryDto]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "getShopCount", null);
exports.ShopsController = ShopsController = __decorate([
    (0, common_1.Controller)('shops'),
    __metadata("design:paramtypes", [shops_service_1.ShopsService])
], ShopsController);
//# sourceMappingURL=shops.controller.js.map