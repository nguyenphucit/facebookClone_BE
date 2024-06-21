import { User } from '@prisma/client';
export interface UserFilterType {
  items_per_pages?: number;
  page?: number;
  search?: string;
}

export interface UserPaginationResponseType {
  data: User[];
  total: number;
  currentPage: number;
  items_per_pages: number;
}
