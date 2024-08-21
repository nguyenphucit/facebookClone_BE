import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PostFilterType,
  PostPaginationResponseType,
  createPostDTO,
} from './dto';
import { Comment, Post } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async getPostsRandomly(
    params: PostFilterType,
  ): Promise<PostPaginationResponseType> {
    const items_per_pages = params.items_per_pages || 10;
    const page = Number(params.page) || 1;
    const search = params.search || '';
    const skip = page > 1 ? (page - 1) * items_per_pages : 0;
    const data = await this.prismaService.post.findMany({
      where: {
        OR: [
          {
            content: { contains: search },
          },
          {
            author: {
              OR: [
                {
                  surname: { contains: search, mode: 'insensitive' },
                },
                {
                  firstname: { contains: search, mode: 'insensitive' },
                },
              ],
            },
          },
        ],
      },
      take: items_per_pages,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        likes: { select: { authorId: true } },
        comments: {
          where: { parentId: null },
          select: {
            id: true,
            content: true,
            createdAt: true,
            childComments: true,
            author: {
              select: {
                surname: true,
                firstname: true,
                avatar: true,
                id: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        author: {
          select: {
            id: true,
            surname: true,
            firstname: true,
            avatar: true,
          },
        },
      },
    });
    const shuffleData = data.sort(() => Math.random() - 0.5);
    const response = {
      data: shuffleData,
      total: data.length,
      currentPage: page,
      items_per_pages: items_per_pages,
    };
    return response;
  }

  async getPostByUserId(userId: number): Promise<Post[]> {
    const data = await this.prismaService.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        comments: {
          where: { parentId: null },
          select: {
            id: true,
            content: true,
            createdAt: true,
            childComments: true,
            author: {
              select: {
                surname: true,
                firstname: true,
                avatar: true,
                id: true,
              },
            },
          },
        },
        author: {
          select: {
            id: true,
            surname: true,
            firstname: true,
            avatar: true,
          },
        },
      },
    });

    return data;
  }

  async createPost(
    postInfo: createPostDTO,
    file?: Express.Multer.File,
  ): Promise<any> {
    if (file) {
      const FileUrl = await (await this.cloudinaryService.uploadFile(file)).url;
      postInfo.file = [];
      postInfo.file.push(FileUrl);
    }
    postInfo.authorId = +postInfo.authorId;
    const response = await this.prismaService.post.create({
      data: postInfo,
      include: {
        comments: true,
        author: {
          select: {
            surname: true,
            firstname: true,
            id: true,
            avatar: true,
          },
        },
      },
    });
    return response;
  }

  async getCommentOnPost(commentId: number): Promise<Comment> {
    const commentInfo = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });
    return commentInfo;
  }

  async likePost(postId: number, userId: number) {
    const likeExist = await this.prismaService.like.findFirst({
      where: { postId: postId, authorId: userId },
    });
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: { likes: true },
    });
    if (likeExist) {
      await this.prismaService.like.delete({
        where: { id: likeExist.id },
      });
      return 0;
    }
    const like = await this.prismaService.like.create({
      data: { postId: postId, authorId: userId },
    });
    post.likes.push(like);
    return 1;
  }
}
