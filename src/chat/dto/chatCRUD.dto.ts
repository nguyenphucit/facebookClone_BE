import { IsNotEmpty, IsNumberString } from 'class-validator';

export class sendMessage {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  senderId: number;
  @IsNotEmpty()
  roomId: string;
}
