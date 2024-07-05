import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  firstname: string;
  surname: string;
  dateOfBirth: Date;
  avatar: string | null;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
  access_token: string;
}
