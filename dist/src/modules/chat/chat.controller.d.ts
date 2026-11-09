import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
export declare class ChatController {
    private svc;
    constructor(svc: ChatService);
    getThreads(user: any): import(".prisma/client").Prisma.PrismaPromise<({
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
    send(threadId: string, user: any, dto: SendMessageDto): Promise<{
        id: string;
        createdAt: Date;
        threadId: string;
        content: string;
        senderId: string;
        isRead: boolean;
    }>;
}
