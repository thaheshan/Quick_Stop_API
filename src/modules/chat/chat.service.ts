import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService }   from '../../common/prisma/prisma.service';
import { sanitizeMessage } from '../../common/utils/sanitize.util';
import { SendMessageDto }  from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  getThreads(userId: string) {
    return this.prisma.chatThread.findMany({
      where: { participants: { some: { userId } } },
      include: {
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
        participants: { include: { user: { select: { id: true, fullName: true } } } },
      },
    });
  }

  getMessages(threadId: string) {
    return this.prisma.chatMessage.findMany({
      where:   { threadId },
      orderBy: { createdAt: 'asc' },
      include: { sender: { select: { id: true, fullName: true } } },
    });
  }

  async sendMessage(senderId: string, dto: SendMessageDto) {
    const sanitized = sanitizeMessage(dto.content);  // Block off-platform contact info
    return this.prisma.chatMessage.create({
      data: { threadId: dto.threadId, senderId, content: sanitized },
    });
  }

  markAsRead(threadId: string, userId: string) {
    return this.prisma.chatMessage.updateMany({
      where: { threadId, isRead: false, senderId: { not: userId } },
      data:  { isRead: true },
    });
  }
}
