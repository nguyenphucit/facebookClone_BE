import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  getUserInfoById(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    return this.userService.getUserById(userId);
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
