import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getMessageByRoom(@Query('roomId') roomId: string): Promise<any> {
    return this.chatService.getChatFromRoomId(roomId);
  }
}
