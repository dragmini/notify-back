import { Module } from '@nestjs/common';
import { WebSocketService } from './websocket.service';
import { MyGateway } from './websocket.gateway';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MessageService } from 'src/message/message.service';

@Module({
  providers: [MyGateway, WebSocketService, UserService, AuthService, PrismaService, JwtService, MessageService]
})
export class WebsocketModule {}
