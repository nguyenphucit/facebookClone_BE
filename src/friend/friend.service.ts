import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { friendListReturnDTO } from './dto';

@Injectable()
export class FriendService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFriendsById(userId: number): Promise<any> {
    const friendListInfo = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        friends: {
          select: { surname: true, firstname: true, id: true, avatar: true },
        },
      },
    });
    return friendListInfo?.friends || [];
  }

  async addFriendById(userId: number, addId: number): Promise<any> {
    const friend = await this.prismaService.user.findUnique({
      where: { id: addId },
      include: { friends: true },
    });
    const currentUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { friends: true },
    });
    await this.prismaService.user.update({
      data: { friends: { connect: { id: currentUser.id } } },
      where: { id: addId },
      include: { friends: true },
    });
    return await this.prismaService.user.update({
      data: { friends: { connect: { id: friend.id } } },
      where: { id: userId },
      include: { friends: true },
    });
  }
}
