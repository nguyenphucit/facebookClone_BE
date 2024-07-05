import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationInfo } from './dto';
import { Notification } from '@prisma/client';
@Injectable()
export class NotificationService {
  constructor(private prismaService: PrismaService) {}

  async notifyWhenCommentOnPost(
    notificationInfo: NotificationInfo,
  ): Promise<Notification> {
    return await this.prismaService.notification.create({
      data: {
        ...notificationInfo,
        type: 'COMMENT_NOTIFY',
        content: 'vừa comment vào bài viết của bạn',
      },
      include: {
        sender: {
          select: { firstname: true, surname: true, id: true, avatar: true },
        },
        post: {
          select: { id: true, author: true },
        },
      },
    });
  }
  async updateNotificationStatus(userId: number): Promise<boolean> {
    const updatedResult = await this.prismaService.notification.updateMany({
      data: { status: 'SEEN' },
      where: { status: 'UNSEEN', receiverId: userId },
    });
    return updatedResult.count !== 0;
  }
  async notifyGetChatMessage(
    notificationInfo: NotificationInfo,
  ): Promise<Notification> {
    return await this.prismaService.notification.create({
      data: {
        ...notificationInfo,
        type: 'CHAT_NOTIFY',
        content: 'vừa nhắn gửi tin nhắn cho bạn',
      },
      include: {
        sender: {
          select: { firstname: true, surname: true, id: true, avatar: true },
        },
      },
    });
  }

  async getNotificationByUserId(userId: number): Promise<Notification[]> {
    const listNotification = await this.prismaService.notification.findMany({
      where: { receiverId: userId },
      include: {
        sender: {
          select: { id: true, surname: true, firstname: true, avatar: true },
        },
        post: {
          select: { id: true, author: true },
        },
      },
    });
    return listNotification;
  }

  async NotificationFriendRequest(
    notificationInfo: NotificationInfo,
  ): Promise<Notification> {
    return await this.prismaService.notification.create({
      data: {
        ...notificationInfo,
        type: 'FRIENDREQUEST_NOTIFY',
        content: 'vừa gửi lời mời kết bạn cho bạn',
      },
      include: {
        sender: {
          select: { firstname: true, surname: true, id: true, avatar: true },
        },
      },
    });
  }

  async notify(NotificationInfo): Promise<Notification> {
    if (NotificationInfo.type === 'COMMENT_NOTIFY')
      return this.notifyWhenCommentOnPost(NotificationInfo);
    else if (NotificationInfo.type === 'FRIENDREQUEST_NOTIFY')
      return this.NotificationFriendRequest(NotificationInfo);
  }
}
