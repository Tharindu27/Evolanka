import { IsString } from 'class-validator';

// The only text field of the multipart request; it holds the JSON of LocationInputDto.
export class SubmitLocationDto {
  @IsString()
  data: string;
}
