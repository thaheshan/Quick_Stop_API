import { IsOptional, IsString, IsNumberString } from 'class-validator';

/**
 * Query params for GET /shops/count
 * All params are optional — falls back to DEFAULT_AREA when none provided.
 *
 * Usage examples:
 *   /shops/count?area=Colombo+03
 *   /shops/count?lat=6.9147&lng=79.8505
 */
export class ShopCountQueryDto {
  /** Named area, e.g. "Colombo 03" */
  @IsOptional()
  @IsString()
  area?: string;

  /** Latitude — must be paired with lng */
  @IsOptional()
  @IsNumberString()
  lat?: string;

  /** Longitude — must be paired with lat */
  @IsOptional()
  @IsNumberString()
  lng?: string;
}
