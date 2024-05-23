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
  getFriendsByUserId(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    return this.friendService.getFriendsById(userId);
  }

  @Post('/add/:userId')
  addFriendByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('addId', ParseIntPipe) addId: number,
  ) {
    return this.friendService.addFriendById(userId, addId);
  }
}
