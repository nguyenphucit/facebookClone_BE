import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, ValidationPipe } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { NotificationInfo } from './dto';
import { promises } from 'dns';
@WebSocketGateway(8001, { cors: '*' })
@Injectable()
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly notificationService: NotificationService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('notification')
  async handleMessage(
    @MessageBody(ValidationPipe) notification: NotificationInfo,
    client: any,
    payload: any,
  ) {
    this.server.emit(
      'notification',
      await this.notificationService.notify(notification),
    );
  }

  handleConnection(socket: Socket) {}

  handleDisconnect(client: any) {}
}
