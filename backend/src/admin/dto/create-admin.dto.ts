import { AdminRole } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, MaxLength } from 'class-validator';

export class CreateAdminDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsEnum(AdminRole)
  role: AdminRole;
}
