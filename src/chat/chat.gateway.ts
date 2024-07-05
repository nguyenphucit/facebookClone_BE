import {
  ConnectedSocket,
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

  private userSocketMap: Map<string, string> = new Map();
  private socketUserMap: Map<string, string> = new Map();
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody(ValidationPipe) message: sendMessage,
    client: any,
    payload: any,
  ) {
    console.log(sendMessage);
    this.server
      .to(message.roomId)
      .emit('message', await this.chatService.sendMessage(message));
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string; userId: any },
  ) {
    this.userSocketMap.set(client.id, payload.userId);
    this.socketUserMap.set(payload.userId, client.id);
    console.log(`Client connected: ${client.id} (User: ${payload.userId})`);
    client.join(payload.roomId);
  }

  @SubscribeMessage('leftChat')
  async handleLeftChat(
    client: Socket,
    @MessageBody() payload: { roomId: string },
  ) {
    client.leave(payload.roomId);
  }

  @SubscribeMessage('sendCallRequest')
  async SendCall(client: Socket, @MessageBody() payload: any) {
    this.server
      .to(this.socketUserMap.get(payload.userToCall))
      .emit('sendCallRequest', {
        signal: payload.signalData,
        from: payload.from,
        name: payload.name,
      });
  }

  @SubscribeMessage('answerCall')
  async AnswerCall(client: Socket, @MessageBody() payload: any) {
    this.server
      .to(this.socketUserMap.get(payload.to))
      .emit('callAccepted', { signal: payload.signal });
  }

  handleConnection(socket: Socket) {}

  handleDisconnect(client: any) {
    if (this.userSocketMap.get(client.id) !== undefined)
      console.log(
        `user with id: ${this.userSocketMap.get(client.id)} and socketId : ${client.id} disconnect`,
      );
  }
}
