import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [ConfigModule.forRoot(),AuthModule, ChatModule, UserModule, MessageModule, WebsocketModule],
  controllers: [AppController],
  providers: [ PrismaClient],
})
export class AppModule {}
