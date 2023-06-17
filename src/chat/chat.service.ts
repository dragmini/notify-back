import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'


@Injectable()
export class ChatService {
    constructor(private prismaServices: PrismaService) {}

    async getAll(userId: number) {
        return  this.prismaServices.user.findUnique({
            where: {id: userId}
        })
    }
}
