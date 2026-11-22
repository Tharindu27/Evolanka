import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(4096)
  accessToken: string;
}

export class AppleLoginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(8192)
  idToken: string;

  // Apple only sends the name on a user's first authorization.
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;
}
