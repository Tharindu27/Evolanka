import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    MediaModule,
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }]),
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET is not set');
        return { secret, signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as never } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ProfileService],
  exports: [JwtModule],
})
export class AuthModule {}
