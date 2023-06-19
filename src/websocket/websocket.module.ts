import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { MyGateway } from './websocket.gateway';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [MyGateway, WebsocketService, UserService, AuthService, PrismaService, JwtService]
})
export class WebsocketModule {}
