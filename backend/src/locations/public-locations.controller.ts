import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LocationsService } from './locations.service';

// Approved locations, open to everyone.
@Controller('public/locations')
export class PublicLocationsController {
  constructor(private readonly locations: LocationsService) {}

  @Get()
  list() {
    return this.locations.listPublic();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.locations.getPublic(id);
  }
}
