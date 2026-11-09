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
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("./bookings.service");
const create_trip_request_dto_1 = require("./dto/create-trip-request.dto");
const create_offer_dto_1 = require("./dto/create-offer.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let BookingsController = class BookingsController {
    constructor(svc) {
        this.svc = svc;
    }
    postRequest(user, dto) {
        return this.svc.postTripRequest(user.id, dto);
    }
    listRequests(location) {
        return this.svc.listOpenRequests(location);
    }
    submitOffer(user, dto) {
        return this.svc.submitOffer(user.id, dto);
    }
    acceptOffer(offerId, user) {
        return this.svc.acceptOffer(offerId, user.id);
    }
    myRequests(user) {
        return this.svc.getMyRequests(user.id);
    }
};
exports.BookingsController = BookingsController;
__decorate([
    (0, common_1.Post)('broadcast'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_trip_request_dto_1.CreateTripRequestDto]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "postRequest", null);
__decorate([
    (0, common_1.Get)('broadcast'),
    __param(0, (0, common_1.Query)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "listRequests", null);
__decorate([
    (0, common_1.Post)('offers'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_offer_dto_1.CreateOfferDto]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "submitOffer", null);
__decorate([
    (0, common_1.Post)('offers/:id/accept'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "acceptOffer", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "myRequests", null);
exports.BookingsController = BookingsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('bookings'),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], BookingsController);
//# sourceMappingURL=bookings.controller.js.map