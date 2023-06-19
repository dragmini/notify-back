import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import IMessageSend from 'src/message/type/send-message.interface';

@Injectable()
export class WebSocketService {
    constructor(private messageService: MessageService){}

    async handlerNewMessage(clientId: number, dto: IMessageSend) {
        // console.log(clientId, dto.chatId)
       return await this.messageService.createNewMessage(clientId, dto)
    }
}
