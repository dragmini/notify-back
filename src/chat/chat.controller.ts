import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import {Get} from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @Auth()
  getChats(@CurrentUser('id') id: number) {
    return this.chatService.getAll(id)
  }
}
