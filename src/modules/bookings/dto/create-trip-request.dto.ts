import { IsEnum, IsString, IsNumber, IsDateString, Min } from 'class-validator';
import { VehicleType } from '@prisma/client';

export class CreateTripRequestDto {
  @IsEnum(VehicleType) vehicleType:   VehicleType;
  @IsString()          location:      string;
  @IsDateString()      startDate:     string;
  @IsDateString()      endDate:       string;
  @IsNumber() @Min(0)  budgetCapLKR:  number;
}
