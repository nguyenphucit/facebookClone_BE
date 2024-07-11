import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { friendListReturnDTO } from './dto';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get(':id')
  getFriendsByUserId(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<friendListReturnDTO> {
    return this.friendService.getFriendsById(userId);
  }

  @Get('mutualFriend/:userId')
  getMutualFriend(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('friendId', ParseIntPipe) friendId: number,
  ) {
    return this.friendService.getMutualFriend(userId, friendId);
  }
  @Post('/add/:userId')
  addFriendByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('addId', ParseIntPipe) addId: number,
  ) {
    return this.friendService.addFriendById(userId, addId);
  }
}
