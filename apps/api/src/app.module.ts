import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TouristModule } from './tourist/tourist.module';

@Module({
  imports: [TouristModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
