import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessageService {
    constructor(private prismaService: PrismaService) {}

    getAll(chatId: number) {
        return this.prismaService.chat.findUnique({
            where: {
                id: chatId
            },
            select: {
                messages: true
            }
        })
    }
}
