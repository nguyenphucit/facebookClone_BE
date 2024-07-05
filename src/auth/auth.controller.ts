import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { RegisterDTO } from './dto/RegisterDTO';
import { LoginDTO, LoginResponse } from './dto';
import { Public } from 'src/common/decorators/auth.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  Login(@Body(ValidationPipe) userInfo: LoginDTO): Promise<LoginResponse> {
    return this.authService.Login(userInfo);
  }

  @Public()
  @Post('/register')
  Register(@Body(ValidationPipe) userInfo: RegisterDTO): Promise<User> {
    return this.authService.Register(userInfo);
  }
}
