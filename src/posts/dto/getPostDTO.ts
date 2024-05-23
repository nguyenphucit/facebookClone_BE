import { Post } from '@prisma/client';
import { IsInt, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export interface PostFilterType {
  items_per_pages?: number;
  page?: number;
  search?: string;
}
export interface PostPaginationResponseType {
  data: Post[];
  total: number;
  currentPage: number;
  items_per_pages: number;
}
export class createPostDTO {
  content: string;

  file: string[];

  @IsNotEmpty()
  @IsNumberString()
  authorId: number;
}
