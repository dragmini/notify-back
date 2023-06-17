import { Prisma } from '@prisma/client'

export const returnUserObject: Prisma.UserSelect = {
	id: true,
	email: true,
	firstName: true,
    secondName: true,
    birthDate: true,
	avatarPath: true,
    chats: true,
	password: false,
	phone: true
}