import { Body, Controller, Get, HttpCode, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { LoginDto } from '../auth/dto/login.dto';
import { AdminService } from './admin.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AdminAuthGuard, type AdminRequest } from './guards/admin-auth.guard';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly admins: AdminService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  login(@Body() dto: LoginDto) {
    return this.admins.login(dto);
  }

  @Get('me')
  @UseGuards(AdminAuthGuard)
  me(@Req() req: AdminRequest) {
    return req.admin;
  }

  @Patch('password')
  @UseGuards(AdminAuthGuard, ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  changePassword(@Req() req: AdminRequest, @Body() dto: ChangePasswordDto) {
    return this.admins.changePassword(req.admin, dto);
  }
}
