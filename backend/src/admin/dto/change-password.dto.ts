import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  currentPassword: string;

  // bcrypt only uses the first 72 bytes, so longer passwords are rejected rather than silently truncated.
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  newPassword: string;
}
