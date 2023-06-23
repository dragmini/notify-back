import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  getProfile(@CurrentUser ('id') id: number) {
    return this.userService.byId(id)
  }

  @Get('list')
  getUserList() {
    return this.userService.getAll()
  }

  @Get(':slug') 
  getBySlug(@Param() slug: {slug: string}) {
    console.log
    return this.userService.getBySlugContains(slug)
  }

  @Auth()
  @Post('change-slug') 
  changeBySlug(@CurrentUser('id') id: number, @Body() dto: {slug: string}) {
    return this.userService.changeSlug(id, dto)
  }
}
