import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  gender: 'FEMALE' | 'MALE' | 'OTHER';

  @IsNotEmpty()
  dateOfBirth: Date;
}
