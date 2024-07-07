import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { FriendModule } from './friend/friend.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { CommentModule } from './comment/comment.module';
import { NotificationModule } from './notification/notification.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    PostsModule,
    FriendModule,
    CloudinaryModule,
    UserModule,
    ChatModule,
    CommentModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
