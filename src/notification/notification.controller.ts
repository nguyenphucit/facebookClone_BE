import { Controller, Get, ParseIntPipe, Param, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from '@prisma/client';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Get(':userId')
  getCommentByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Notification[]> {
    return this.notificationService.getNotificationByUserId(userId);
  }

  @Put('/updateStatus/:userId')
  updateNotificationStatus(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Boolean> {
    return this.notificationService.updateNotificationStatus(userId);
  }
}
