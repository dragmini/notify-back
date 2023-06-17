import { IsArray, IsOptional, IsString } from 'class-validator'

export class ChatDto {
	@IsArray()
	users: number[]
}