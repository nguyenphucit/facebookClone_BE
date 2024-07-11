import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { friend, friendListReturnDTO } from './dto';

@Injectable()
export class FriendService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFriendsById(userId: number): Promise<friendListReturnDTO> {
    const friends = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        friends: {
          select: { surname: true, firstname: true, id: true, avatar: true },
        },
      },
    });
    const friendList: friend[] = friends.friends.map((friend) => ({
      id: friend.id,
      firstname: friend.firstname,
      surname: friend.surname,
      avatar: friend.avatar ?? '', // Handle null avatar if necessary
    }));

    return { friendList };
  }

  async addFriendById(userId: number, addId: number) {
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
    await this.prismaService.user.update({
      data: { friends: { connect: { id: friend.id } } },
      where: { id: userId },
      include: { friends: true },
    });
  }

  async getMutualFriend(userId: number, friendId: number): Promise<any> {
    const userFriends = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { friends: { select: { id: true, avatar: true } } },
    });
    const friend_Friends = await this.prismaService.user.findUnique({
      where: { id: friendId },
      include: { friends: { select: { id: true, avatar: true } } },
    });
    const response = userFriends.friends.filter((friend) =>
      friend_Friends.friends.some((item) => item.id === friend.id),
    );
    return response;
  }
}
