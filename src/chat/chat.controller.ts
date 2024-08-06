import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
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

  @Put('/updateStatus/:userId')
  updateNotificationStatus(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Boolean> {
    return this.chatService.updateChatMessageStatus(userId);
  }

  @Put('/updateStatusByRoomId/:roomId')
  updateNotificationStatusByRoomId(
    @Param('roomId') roomId: string,
  ): Promise<Boolean> {
    return this.chatService.updateChatMessageStatusByRoomId(roomId);
  }
}
