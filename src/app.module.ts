import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(),AuthModule, ChatModule, UserModule],
  controllers: [AppController],
  providers: [ PrismaClient],
})
export class AppModule {}
