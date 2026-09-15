import {
  WebSocketGateway, WebSocketServer,
  SubscribeMessage, MessageBody, ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService }    from './chat.service';
import { sanitizeMessage } from '../../common/utils/sanitize.util';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private chatSvc: ChatService) {}

  /** Client joins a chat thread room */
  @SubscribeMessage('joinThread')
  handleJoin(@MessageBody() threadId: string, @ConnectedSocket() client: Socket) {
    client.join(threadId);
    return { event: 'joined', threadId };
  }

  /** Client sends a message — sanitized and broadcast to room */
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() payload: { threadId: string; senderId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const saved = await this.chatSvc.sendMessage(payload.senderId, {
      threadId: payload.threadId,
      content:  payload.content,
    });
    // Broadcast sanitized message to all participants in the thread room
    this.server.to(payload.threadId).emit('newMessage', saved);
    return saved;
  }
}
