import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { sendMessage } from './dto/chatCRUD.dto';
@WebSocketGateway(8001, { cors: '*' })
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody(ValidationPipe) message: sendMessage,
    client: any,
    payload: any,
  ) {
    this.server.emit('message', await this.chatService.sendMessage(message));
  }

  handleConnection(socket: Socket) {}

  handleDisconnect(client: any) {}
}
