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

	async getAll() {
		const list = await this.prismaService.user.findMany()
		
		return list
	}

	async getBySlugContains(dto: { slug: string }) {

		const users = await this.prismaService.user.findMany({
			where: {
				userSlug: {
					contains: dto.slug,
				}
			},
      	})
		return users
	}

	async changeSlug(id: number, dto: {slug: string}) {
		return this.prismaService.user.update({
			where: { id: id },
			data: { userSlug: dto.slug },
		});
	}
}
