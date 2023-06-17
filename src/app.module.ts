import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),AuthModule],
  controllers: [AppController],
  providers: [ PrismaClient],
})
export class AppModule {}
