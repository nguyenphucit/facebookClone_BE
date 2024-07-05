import { IsNotEmpty, IsNumberString } from 'class-validator';

export class sendMessage {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  senderId: number;
  @IsNotEmpty()
  roomId: string;
}

interface Sender {
  id: number;
  firstname: string;
  surname: string;
  avatar: string | null;
}

export interface MessageFromRoom {
  id: number;
  roomId: string;
  content: string;
  senderId: number;
  createdAt: Date;
  updatedAt: Date;
  sender: Sender;
}
