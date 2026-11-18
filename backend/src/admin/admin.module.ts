import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { AdminAuthController } from './admin-auth.controller';
import { AdminService } from './admin.service';
import { AdminsController } from './admins.controller';
import { AdminAuthGuard, SuperAdminGuard } from './guards/admin-auth.guard';

@Module({
  imports: [AuthModule, MailModule, ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }])],
  controllers: [AdminAuthController, AdminsController],
  providers: [AdminService, AdminAuthGuard, SuperAdminGuard],
})
export class AdminModule {}
