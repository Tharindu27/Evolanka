import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TouristModule } from './tourist/tourist.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [PrismaModule, TouristModule, AuthModule, AdminModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
