import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { createCommentDTO } from './dto/CRUD_DTO.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Body(ValidationPipe) comment: createCommentDTO) {
    return this.commentService.createComment(comment);
  }
}
