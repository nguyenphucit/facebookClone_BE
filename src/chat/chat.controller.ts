import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageFromRoom } from './dto/chatCRUD.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getMessageByRoom(
    @Query('roomId') roomId: string,
  ): Promise<MessageFromRoom[]> {
    return this.chatService.getChatFromRoomId(roomId);
  }
}
