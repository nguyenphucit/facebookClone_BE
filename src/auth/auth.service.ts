import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDTO } from './dto/RegisterDTO';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO, LoginResponse } from './dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async Login(userInfo: LoginDTO): Promise<LoginResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { email: userInfo.email },
    });

    const match = user && (await compare(userInfo.password, user.password));

    if (!user || !match) {
      throw new HttpException(
        { message: !user ? 'Account does not exist' : 'Wrong password' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const access_token = await this.SignToken(user);
    const response = { ...user, access_token };

    delete response.password;
    return response;
  }

  async Register(userInfo: RegisterDTO): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email: userInfo.email },
    });
    if (user) {
      throw new HttpException(
        {
          message: 'this email is already be used',
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPass = await hash(userInfo.password, 10);
    const response = await this.prismaService.user.create({
      data: { ...userInfo, password: hashPass },
    });
    return response;
  }

  async SignToken(userInfo: User): Promise<string> {
    const user = { ...userInfo, password: '' };
    const access_token = await this.jwtService.signAsync(user, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET_KEY,
    });
    return access_token;
  }

  async SignRefreshToken(userInfo: User): Promise<string> {
    const user = { ...userInfo, password: '' };
    const refresh_token = await this.jwtService.signAsync(user, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET_REFRESH,
    });
    return refresh_token;
  }
}
