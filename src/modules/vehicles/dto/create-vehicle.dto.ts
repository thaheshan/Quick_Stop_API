import { IsEnum, IsString, IsNumber, IsOptional, IsArray, Min } from 'class-validator';
import { VehicleType } from '@prisma/client';

export class CreateVehicleDto {
  @IsEnum(VehicleType) type:         VehicleType;
  @IsString()          make:         string;
  @IsString()          model:        string;
  @IsNumber()          year:         number;
  @IsString()          plateNumber:  string;
  @IsString()          location:     string;
  @IsNumber() @Min(0)  basePriceLKR: number;
  @IsArray() @IsOptional() photos:   string[];
}
