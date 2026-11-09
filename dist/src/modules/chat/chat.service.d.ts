import { PrismaService } from '../../common/prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    getThreads(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
        participants: ({
            user: {
                id: string;
                fullName: string;
            };
        } & {
            id: string;
            threadId: string;
            userId: string;
        })[];
        messages: {
            id: string;
            createdAt: Date;
            threadId: string;
            content: string;
            senderId: string;
            isRead: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tripRequestId: string;
    })[]>;
    getMessages(threadId: string): import(".prisma/client").Prisma.PrismaPromise<({
        sender: {
            id: string;
            fullName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        threadId: string;
        content: string;
        senderId: string;
        isRead: boolean;
    })[]>;
    sendMessage(senderId: string, dto: SendMessageDto): Promise<{
        id: string;
        createdAt: Date;
        threadId: string;
        content: string;
        senderId: string;
        isRead: boolean;
    }>;
    markAsRead(threadId: string, userId: string): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
}
