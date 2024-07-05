import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  PostFilterType,
  PostPaginationResponseType,
  createPostDTO,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as PostModel } from '@prisma/client';
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Get()
  getAllPostRandomly(
    @Query() params: PostFilterType,
  ): Promise<PostPaginationResponseType> {
    return this.postService.getPostsRandomly(params);
  }
  @Get('/by-user')
  getAllPostByUserId(
    @Query('userId', ParseIntPipe) userId: number,
  ): Promise<PostModel[]> {
    return this.postService.getPostByUserId(userId);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  createPost(
    @Body(ValidationPipe) postInfo: createPostDTO,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<any> {
    return this.postService.createPost(postInfo, file);
  }
}
