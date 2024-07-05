import { Injectable } from '@nestjs/common';
import { ChatMessage } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageFromRoom, sendMessage } from './dto/chatCRUD.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}
  async sendMessage(message: sendMessage): Promise<ChatMessage> {
    const chatInfo = await this.prismaService.chatMessage.create({
      data: message,
      include: {
        sender: {
          select: {
            id: true,
            firstname: true,
            surname: true,
            avatar: true,
          },
        },
      },
    });
    return chatInfo;
  }

  async getChatFromRoomId(roomId: string): Promise<MessageFromRoom[]> {
    const chatMessages = await this.prismaService.chatMessage.findMany({
      where: { roomId: roomId },
      include: {
        sender: {
          select: {
            id: true,
            firstname: true,
            surname: true,
            avatar: true,
          },
        },
      },
    });
    return chatMessages;
  }
}
