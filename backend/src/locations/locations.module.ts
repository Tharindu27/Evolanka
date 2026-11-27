import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { MediaModule } from '../media/media.module';
import { AdminLocationsController } from './admin-locations.controller';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { PublicLocationsController } from './public-locations.controller';

@Module({
  imports: [AuthModule, AdminModule, MailModule, MediaModule, ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }])],
  controllers: [LocationsController, AdminLocationsController, PublicLocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
