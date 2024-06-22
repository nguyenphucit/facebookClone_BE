import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
export class NotificationInfo {
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @IsNotEmpty()
  @IsNumber()
  receiverId: number;

  @IsNotEmpty()
  type:
    | 'FRIENDREQUEST_NOTIFY'
    | 'SYSTEM_NOTIFY'
    | 'TAG_NOTIFY'
    | 'COMMENT_NOTIFY'
    | 'REACT_NOTIFY'
    | 'CHAT_NOTIFY'
    | 'GROUP_NOTIFY';

  postId: number;
}
