import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, type AuthRequest } from '../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterProviderDto } from './dto/register-provider.dto';
import { RegisterTouristDto } from './dto/register-tourist.dto';
import { AppleLoginDto, GoogleLoginDto } from './dto/social-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('tourist/register')
  registerTourist(@Body() dto: RegisterTouristDto) {
    return this.authService.registerTourist(dto);
  }

  @Post('tourist/login')
  @HttpCode(200)
  loginTourist(@Body() dto: LoginDto) {
    return this.authService.loginTourist(dto);
  }

  @Post('tourist/google')
  @HttpCode(200)
  googleTourist(@Body() dto: GoogleLoginDto) {
    return this.authService.loginTouristWithGoogle(dto);
  }

  @Post('tourist/apple')
  @HttpCode(200)
  appleTourist(@Body() dto: AppleLoginDto) {
    return this.authService.loginTouristWithApple(dto);
  }

  @Post('provider/register')
  registerProvider(@Body() dto: RegisterProviderDto) {
    return this.authService.registerProvider(dto);
  }

  @Post('provider/login')
  @HttpCode(200)
  loginProvider(@Body() dto: LoginDto) {
    return this.authService.loginProvider(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: AuthRequest) {
    return this.authService.getProfile(req.user.id, req.user.role);
  }
}
