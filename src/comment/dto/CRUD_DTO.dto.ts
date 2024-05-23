import { IsNotEmpty, IsNumberString } from 'class-validator';

export class createCommentDTO {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  postId: number;
  @IsNotEmpty()
  authorId: number;
  parentId: number;
}
