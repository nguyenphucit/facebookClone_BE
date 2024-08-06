import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageFromRoom } from './dto/chatCRUD.dto';
import { ChatMessage } from '@prisma/client';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getMessageByRoom(
    @Query('roomId') roomId: string,
  ): Promise<MessageFromRoom[]> {
    return this.chatService.getChatFromRoomId(roomId);
  }

  @Get('/allChat/:userId')
  async getAllLatestMessage(
    @Param('userId') userId: number,
  ): Promise<ChatMessage[]> {
    return await this.chatService.getAllLastestMessageByUserId(userId);
  }
}
