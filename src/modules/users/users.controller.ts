import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser }  from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private svc: UsersService) {}

  @Get('me')
  profile(@CurrentUser() user: any) {
    return this.svc.getProfile(user.id);
  }

  @Patch('me')
  update(@CurrentUser() user: any, @Body() body: { fullName?: string }) {
    return this.svc.updateProfile(user.id, body);
  }
}
