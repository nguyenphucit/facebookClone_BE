import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserFilterType, UserPaginationResponseType } from './dtos/getUserDTO';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getAllUser(
    params: UserFilterType,
  ): Promise<UserPaginationResponseType> {
    const items_per_pages = params.items_per_pages || 10;
    const page = Number(params.page) || 1;
    const search = params.search || '';
    const skip = page > 1 ? (page - 1) * items_per_pages : 0;
    const data = await this.prismaService.user.findMany({
      where: {
        OR: [
          {
            surname: { contains: search, mode: 'insensitive' },
          },
          {
            firstname: { contains: search, mode: 'insensitive' },
          },
        ],
      },
      take: items_per_pages,
      skip: skip,
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      include: {
        friends: {
          select: {
            avatar: true,
            id: true,
          },
        },
      },
    });
    const sanitizedData = data.map((user) => {
      const password = '';
      user.password = password;
      return user;
    });

    const response = {
      data: sanitizedData,
      total: data.length,
      currentPage: page,
      items_per_pages: items_per_pages,
    };
    return response;
  }

  async getUserById(userId: number): Promise<any> {
    const response = this.prismaService.user.findUnique({
      where: { id: userId },
    });
    delete response['password'];
    return response;
  }
  async updateAva(
    imageInfo: any,
    file: Express.Multer.File,
    userId: number,
  ): Promise<any> {
    let FileUrl = '';
    if (file) {
      FileUrl = await (await this.cloudinaryService.uploadFile(file)).url;
    }
    const response = await this.prismaService.user.update({
      where: { id: userId },
      data: { avatar: FileUrl },
    });
    delete response['password'];
    return response;
  }
}
