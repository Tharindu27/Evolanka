import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  currentPassword: string;

  // Same rules as registration; bcrypt ignores bytes past 72, so longer values are rejected.
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/(?=.*[A-Za-z])(?=.*\d)/, { message: 'newPassword must contain letters and numbers' })
  newPassword: string;
}
