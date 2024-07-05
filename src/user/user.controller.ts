import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserFilterType, UserPaginationResponseType } from './dtos/getUserDTO';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  getUserInfoById(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    return this.userService.getUserById(userId);
  }

  @Get()
  getAllUser(
    @Query() params: UserFilterType,
  ): Promise<UserPaginationResponseType> {
    return this.userService.getAllUser(params);
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Put('updateAvatar/:id')
  updateAvatar(
    @Param('id', ParseIntPipe) userId: number,
    @Body(ValidationPipe) imageInfo: any,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userService.updateAva(imageInfo, avatar, userId);
  }
}
