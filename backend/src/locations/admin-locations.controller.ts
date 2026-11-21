import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminAuthGuard, ContentModeratorGuard, type AdminRequest } from '../admin/guards/admin-auth.guard';
import { RejectLocationDto } from './dto/reject-location.dto';
import { SubmitLocationDto } from './dto/submit-location.dto';
import { locationImages } from './location-images';
import { LocationsService, type LocationFiles } from './locations.service';

@Controller('admin/locations')
@UseGuards(AdminAuthGuard, ContentModeratorGuard)
export class AdminLocationsController {
  constructor(private readonly locations: LocationsService) {}

  @Get()
  list() {
    return this.locations.listForAdmin();
  }

  @Post()
  @UseInterceptors(locationImages())
  create(@Req() req: AdminRequest, @Body() dto: SubmitLocationDto, @UploadedFiles() files: LocationFiles) {
    return this.locations.createByAdmin(req.admin, dto.data, files ?? {});
  }

  @Patch(':id/approve')
  approve(@Req() req: AdminRequest, @Param('id', ParseIntPipe) id: number) {
    return this.locations.approve(req.admin, id);
  }

  @Patch(':id/reject')
  reject(@Req() req: AdminRequest, @Param('id', ParseIntPipe) id: number, @Body() dto: RejectLocationDto) {
    return this.locations.reject(req.admin, id, dto.reason);
  }

  @Patch(':id/revise')
  revise(@Param('id', ParseIntPipe) id: number) {
    return this.locations.revise(id);
  }
}
