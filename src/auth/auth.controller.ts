import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { RegisterDTO } from './dto/RegisterDTO';
import { LoginDTO } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  Login(@Body(ValidationPipe) userInfo: LoginDTO): Promise<any> {
    return this.authService.Login(userInfo);
  }
  @Post('/register')
  Register(@Body(ValidationPipe) userInfo: RegisterDTO): Promise<User> {
    return this.authService.Register(userInfo);
  }
}
