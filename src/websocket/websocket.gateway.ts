import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import {UnauthorizedException} from "@nestjs/common";

// import { Server } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createServer } from 'http';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import IMesageSend from 'src/message/type/send-message.interface';
import IMessageSend from 'src/message/type/send-message.interface';
import { Message } from '@prisma/client';
import { WebSocketService } from './websocket.service';


@WebSocketGateway(8080)
export class MyGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server:Server;

  connections: Map<string, Socket> = new Map();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private jwtService: JwtService,
    private webSocketService: WebSocketService){}


  @SubscribeMessage('chat message')
  async handleChatMessage(client: Socket, payload: IMessageSend) {
    const decodedToken = this.jwtService.decode(client.handshake.query.token as string);
    const createdMessage = await  this.webSocketService.handlerNewMessage(decodedToken['id'], payload)
    const userIds = createdMessage.chat.users.map(user => user.id)

    for (const [clientId, clientSocket] of this.connections) {
      if(userIds.includes(+clientId) && clientId !== decodedToken['id']) {
        clientSocket.emit('chat message', createdMessage)
      }
    }
  }

  afterInit() {
    console.log('WebSocket сервер инициализирован');
  }

 async  handleConnection(socket: Socket) {
    try {
      const decodedToken = this.jwtService.decode(socket.handshake.query.token as string);
      const user = await this.userService.byId(decodedToken['id']);
  
        if(!user){
          console.log('disconnect user');
          return this.disconnect(socket);
        } else {
          this.connections.set(decodedToken['id'], socket);
        }
      } catch {
        console.log('disconnect user')
        return this.disconnect(socket);
      }
  }

  handleDisconnect(client: any) {
    console.log('WebSocket соединение разорвано');
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  configure() {
    const httpServer = createServer();
    this.server = new Server({ server: httpServer });

    const proxyMiddleware = createProxyMiddleware('/ws', {
      target: 'ws://localhost:3001',
      ws: true,
      // changeOrigin: true,
    });

    this.server.on('upgrade', (req, socket, head) => {
      proxyMiddleware.upgrade!(req, socket, head);
    });
  }
}
