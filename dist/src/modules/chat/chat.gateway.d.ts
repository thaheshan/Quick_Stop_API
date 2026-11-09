import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway {
    private chatSvc;
    server: Server;
    constructor(chatSvc: ChatService);
    handleJoin(threadId: string, client: Socket): {
        event: string;
        threadId: string;
    };
    handleMessage(payload: {
        threadId: string;
        senderId: string;
        content: string;
    }, client: Socket): Promise<{
        id: string;
        createdAt: Date;
        threadId: string;
        content: string;
        senderId: string;
        isRead: boolean;
    }>;
}
