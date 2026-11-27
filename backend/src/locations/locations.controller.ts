import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard, type AuthRequest } from '../common/guards/jwt-auth.guard';
import { SubmitLocationDto } from './dto/submit-location.dto';
import { locationImages } from './location-images';
import { LocationsService, type LocationFiles } from './locations.service';

// Contributions made by the signed-in tourist or provider.
@Controller('locations')
@UseGuards(JwtAuthGuard)
export class LocationsController {
  constructor(private readonly locations: LocationsService) {}

  @Post()
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 15, ttl: 3_600_000 } })
  @UseInterceptors(locationImages())
  submit(@Req() req: AuthRequest, @Body() dto: SubmitLocationDto, @UploadedFiles() files: LocationFiles) {
    return this.locations.submit(req.user, dto.data, files ?? {});
  }

  @Get('mine')
  mine(@Req() req: AuthRequest) {
    return this.locations.listMine(req.user);
  }

  @Patch(':id/withdraw')
  withdraw(@Req() req: AuthRequest, @Param('id', ParseIntPipe) id: number) {
    return this.locations.withdraw(req.user, id);
  }

  @Delete(':id')
  remove(@Req() req: AuthRequest, @Param('id', ParseIntPipe) id: number) {
    return this.locations.removeMine(req.user, id);
  }
}
