import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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
