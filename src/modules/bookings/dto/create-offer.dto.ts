import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOfferDto {
  @IsString()          requestId:        string;
  @IsString()          vehicleId:        string;
  @IsNumber() @Min(0)  proposedPriceLKR: number;
  @IsOptional() @IsString() message?:   string;
}
