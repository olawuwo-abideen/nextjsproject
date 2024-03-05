import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditCentresDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
