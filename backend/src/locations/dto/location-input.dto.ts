import { ArrayMaxSize, IsArray, IsBoolean, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, Min } from 'class-validator';

// Sent as a JSON string in the multipart field "data" next to the image files.
export class LocationInputDto {
  @IsString()
  @Matches(/\S/, { message: 'name must not be empty' })
  @MaxLength(150)
  name: string;

  @IsOptional() @IsString() @MaxLength(60) province?: string;
  @IsOptional() @IsString() @MaxLength(60) district?: string;
  @IsOptional() @IsString() @MaxLength(100) nearestTown?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(12)
  @IsString({ each: true })
  @MaxLength(60, { each: true })
  categories?: string[];

  @IsOptional() @IsString() @MaxLength(5000) description?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(150, { each: true })
  highlights?: string[];

  @IsOptional() @IsString() @MaxLength(300) bestTime?: string;
  @IsOptional() @IsString() @MaxLength(300) openingDays?: string;
  @IsOptional() @IsBoolean() freeEntry?: boolean;
  @IsOptional() @IsString() @MaxLength(60) localAdultPrice?: string;
  @IsOptional() @IsString() @MaxLength(60) localChildPrice?: string;
  @IsOptional() @IsString() @MaxLength(60) foreignAdultPrice?: string;
  @IsOptional() @IsString() @MaxLength(60) foreignChildPrice?: string;
  @IsOptional() @IsString() @MaxLength(500) ticketNote?: string;
  @IsOptional() @IsString() @MaxLength(300) address?: string;

  @IsOptional() @IsNumber() @Min(-90) @Max(90) latitude?: number;
  @IsOptional() @IsNumber() @Min(-180) @Max(180) longitude?: number;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(600, { each: true })
  travelTips?: string[];

  // Tourists and providers can save an unfinished location that admins do not see yet.
  @IsOptional() @IsBoolean() draft?: boolean;
}
