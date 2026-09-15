import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class AddPricingRuleDto {
  @IsString()          label:      string;
  @IsNumber() @Min(0.1) @Max(5)  multiplier: number;
  @IsOptional() @IsString() startDate?: string;
  @IsOptional() @IsString() endDate?:   string;
}
