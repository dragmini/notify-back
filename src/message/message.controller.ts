import {Get, Controller, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':id') 
  getMessageByChat(@Param('id') chatId: string ) {
    return this.messageService.getAll(+chatId)
  }
}
