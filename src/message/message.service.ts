import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import IMessageSend from './type/send-message.interface';

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

    async createNewMessage(userId: number,dto: IMessageSend) {
        const message = await this.prismaService.message.create({
            data: {
              content: dto.content,
              user: { connect: { id: userId } },
              chat: {
                connect: { id: dto.chatId }
              }
            },
            include: {
              chat: {
                select: {
                    id: true,
                    users: {
                        select: {
                            id: true,
                            email: true,
                            password: false,
                            firstName: true,
                            secondName: true,
                            birthDate: true,
                            avatarPath: true,
                            phone: true
                        }
                    }
                }
              } // Включаем связь с моделью Chat
            }
          });

        await this.prismaService.chat.update({
            where: { id: dto.chatId },
            data: { messages: { connect: { id: message.id } } },
        });

        return message
    }
}
