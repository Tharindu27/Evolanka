import { IsOptional, IsString, MaxLength } from 'class-validator';

export class RejectLocationDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
