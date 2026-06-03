import { Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
  IsOptional,
} from 'class-validator';
export class GetEstimateDto {
  @IsString()
  @IsOptional()
  make: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  mileage: number;

  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  @IsOptional()
  lng: number;

  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  @IsOptional()
  lat: number;
}
