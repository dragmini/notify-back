import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
import { ChatDto } from './dto/chat.dto';
import { transformDocument } from '@prisma/client/runtime';


@Injectable()
export class ChatService {
    constructor(private prismaServices: PrismaService) {}

    async getAll(userId: number) {
        return  await this.prismaServices.user.findUnique({
            where: {id: userId},
            select: {
                chats: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        messages: true,
                        users: true
                    }
                }
            }
        })
    }

    async create(dto: ChatDto) {
        console.log(dto)
        return await this.prismaServices.chat.create({
          data:{
           users: {
            connect: dto.users.map((userId) => ({ id: userId }))
           },
          },
          include: {
            users: true,
            messages:true
          },
        })
    }

    async getById(id: number) {
        return await this.prismaServices.chat.findUnique({
            where: {
                id
            }
        })
    }
}
