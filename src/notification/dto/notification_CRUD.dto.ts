import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
export class NotificationInfo {
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @IsNotEmpty()
  @IsNumber()
  receiverId: number;

  postId: number;
}
