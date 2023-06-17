import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { returnUserObject } from './return-user.object';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}
    async byId(id: number, selectPrisma: Prisma.UserSelect = {}) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			},
			select: {
				...returnUserObject,
				...selectPrisma
			}
		})

		if (!user) throw new NotFoundException(`User not found`)

		return user
	}
}
