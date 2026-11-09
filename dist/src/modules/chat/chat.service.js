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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const sanitize_util_1 = require("../../common/utils/sanitize.util");
let ChatService = class ChatService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getThreads(userId) {
        return this.prisma.chatThread.findMany({
            where: { participants: { some: { userId } } },
            include: {
                messages: { orderBy: { createdAt: 'desc' }, take: 1 },
                participants: { include: { user: { select: { id: true, fullName: true } } } },
            },
        });
    }
    getMessages(threadId) {
        return this.prisma.chatMessage.findMany({
            where: { threadId },
            orderBy: { createdAt: 'asc' },
            include: { sender: { select: { id: true, fullName: true } } },
        });
    }
    async sendMessage(senderId, dto) {
        const sanitized = (0, sanitize_util_1.sanitizeMessage)(dto.content);
        return this.prisma.chatMessage.create({
            data: { threadId: dto.threadId, senderId, content: sanitized },
        });
    }
    markAsRead(threadId, userId) {
        return this.prisma.chatMessage.updateMany({
            where: { threadId, isRead: false, senderId: { not: userId } },
            data: { isRead: true },
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map