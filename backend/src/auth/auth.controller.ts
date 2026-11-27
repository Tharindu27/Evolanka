import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard, type AuthRequest } from '../common/guards/jwt-auth.guard';
import { AuthService, type AuthRole } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterProviderDto } from './dto/register-provider.dto';
import { RegisterTouristDto } from './dto/register-tourist.dto';
import { AppleLoginDto, GoogleLoginDto } from './dto/social-login.dto';
import { UpdateProviderProfileDto, UpdateTouristProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

const PICTURE_MAX_BYTES = 5 * 1024 * 1024;
const PICTURE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const requireRole = (req: AuthRequest, role: AuthRole) => {
  if (req.user.role !== role) throw new ForbiddenException(`This action is only available to ${role} accounts`);
};

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
  ) {}

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

  @Patch('password')
  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  changePassword(@Req() req: AuthRequest, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.id, req.user.role, dto);
  }

  @Patch('tourist/profile')
  @UseGuards(JwtAuthGuard)
  updateTouristProfile(@Req() req: AuthRequest, @Body() dto: UpdateTouristProfileDto) {
    requireRole(req, 'tourist');
    return this.profileService.updateTourist(req.user.id, dto);
  }

  @Patch('provider/profile')
  @UseGuards(JwtAuthGuard)
  updateProviderProfile(@Req() req: AuthRequest, @Body() dto: UpdateProviderProfileDto) {
    requireRole(req, 'provider');
    return this.profileService.updateProvider(req.user.id, dto);
  }

  @Post('profile/picture')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: PICTURE_MAX_BYTES, files: 1 },
      fileFilter: (_req, file, callback) =>
        PICTURE_TYPES.includes(file.mimetype)
          ? callback(null, true)
          : callback(new BadRequestException('Profile picture must be a JPG, PNG or WebP image'), false),
    }),
  )
  uploadPicture(@Req() req: AuthRequest, @UploadedFile() file?: Express.Multer.File) {
    return this.profileService.setPicture(req.user.id, req.user.role, file);
  }
}
