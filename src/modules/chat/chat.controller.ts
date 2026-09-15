import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ChatService }    from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard }   from '../../common/guards/jwt-auth.guard';
import { CurrentUser }    from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private svc: ChatService) {}

  /** GET /chat/threads */
  @Get('threads')
  getThreads(@CurrentUser() user: any) {
    return this.svc.getThreads(user.id);
  }

  /** GET /chat/threads/:threadId/messages */
  @Get('threads/:threadId/messages')
  getMessages(@Param('threadId') threadId: string) {
    return this.svc.getMessages(threadId);
  }

  /** POST /chat/threads/:threadId/messages */
  @Post('threads/:threadId/messages')
  send(@Param('threadId') threadId: string, @CurrentUser() user: any, @Body() dto: SendMessageDto) {
    return this.svc.sendMessage(user.id, { ...dto, threadId });
  }
}
