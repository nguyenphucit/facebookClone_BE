import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
@Module({
  imports: [PrismaModule],
  providers: [PrismaService, NotificationGateway, NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
