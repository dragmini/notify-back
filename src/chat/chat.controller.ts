import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import {Get, Post, Body, Param} from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ChatDto } from './dto/chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @Auth()
  getChats(@CurrentUser('id') id: number) {
    return this.chatService.getAll(id)
  }

  @Post('create')
  createChat(@Body() dto: ChatDto ) {
    return this.chatService.create(dto)
  }

  @Get('by-id/:id')
  getById(@Param('id') chatId: string) {
    return this.chatService.getById(+chatId)
  } 
}
