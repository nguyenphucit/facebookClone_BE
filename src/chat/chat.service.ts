import { Injectable } from '@nestjs/common';
import { ChatMessage } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageFromRoom, sendMessage } from './dto/chatCRUD.dto';
import { groupBy } from 'rxjs';

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
      orderBy: {
        createdAt: 'asc',
      },
    });
    return chatMessages;
  }

  async getAllLastestMessageByUserId(userId: number): Promise<ChatMessage[]> {
    const roomIds = await this.prismaService.chatMessage.groupBy({
      by: ['roomId'],
      where: {
        roomId: { contains: userId.toString() },
      },
    });
    const latestMessages = await Promise.all(
      roomIds.map(async (roomId) => {
        return this.prismaService.chatMessage.findFirst({
          where: { roomId: roomId.roomId },
          orderBy: { createdAt: 'desc' },
          take: 1, // Lấy tin nhắn mới nhất
        });
      }),
    );
    return latestMessages;
  }

  async updateChatMessageStatus(userId: number) {
    const updatedResult = await this.prismaService.chatMessage.updateMany({
      data: { status: 'SEEN' },
      where: {
        status: 'UNSEEN',
        roomId: {
          contains: userId.toString(),
          mode: 'insensitive', // Optional: if you want a case-insensitive search
        },
      },
    });
    return updatedResult.count !== 0;
  }

  async updateChatMessageStatusByRoomId(roomId: string) {
    const updatedResult = await this.prismaService.chatMessage.updateMany({
      data: { status: 'SEEN' },
      where: {
        status: 'UNSEEN',
        roomId: roomId,
      },
    });
    return updatedResult.count !== 0;
  }
}
