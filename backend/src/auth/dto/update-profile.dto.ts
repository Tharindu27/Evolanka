import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

// Email is deliberately absent: the global whitelist pipe rejects it, so it cannot be changed.
export class UpdateProviderProfileDto {
  @IsOptional()
  @IsString()
  @Matches(/\S/, { message: 'name must not be empty' })
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/\S/, { message: 'mobileNumber must not be empty' })
  @MaxLength(20)
  mobileNumber?: string;
}

export class UpdateTouristProfileDto extends UpdateProviderProfileDto {
  @IsOptional()
  @IsString()
  @Matches(/\S/, { message: 'gender must not be empty' })
  @MaxLength(30)
  gender?: string;

  @IsOptional()
  @IsString()
  @Matches(/\S/, { message: 'country must not be empty' })
  @MaxLength(100)
  country?: string;

  // An empty string clears the value.
  @IsOptional()
  @IsString()
  @MaxLength(30)
  passportNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  nic?: string;
}
