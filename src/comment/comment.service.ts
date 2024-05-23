import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCommentDTO } from './dto/CRUD_DTO.dto';
@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCommentOnPostId(postId: number) {
    return await this.prismaService.post.findUnique({
      where: { id: postId },
      select: { comments: true },
    });
  }

  async createComment(comment: createCommentDTO) {
    const post = await this.prismaService.post.findUnique({
      where: { id: comment.postId },
      include: { comments: true },
    });
    if (!post) {
      throw new HttpException(
        { message: 'this post is not available' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const commentCreated = await this.prismaService.comment.create({
      data: comment,
      include: {
        author: {
          select: { surname: true, firstname: true, avatar: true, id: true },
        },
      },
    });
    post.comments.push(commentCreated);
    return commentCreated;
  }
}
