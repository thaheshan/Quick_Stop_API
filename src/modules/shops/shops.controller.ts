import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ShopsService }        from './shops.service';
import { ShopCountQueryDto }   from './dto/shop-count-query.dto';

/**
 * ShopsController — BE-2.1 Shop Discovery endpoints
 *
 * All routes are PUBLIC (no JwtAuthGuard) — called during unauthenticated
 * onboarding to show the user how many shops are near them.
 *
 * Base path: /api/v1/shops  (global prefix set in main.ts)
 */
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  /**
   * GET /api/v1/shops/count
   *
   * Returns the count of active, approved shops for a given area.
   *
   * Query params (all optional):
   *   ?area=Colombo+03          — named area string
   *   ?lat=6.9147&lng=79.8505   — GPS coordinates (used when area not provided)
   *   (no params)               — falls back to DEFAULT_AREA ("Colombo 03")
   *
   * Example responses:
   *   200 { "area": "Colombo 03", "count": 12, "cached": false }
   *   200 { "area": "Colombo 03", "count": 12, "cached": true  }
   */
  @Get('count')
  @HttpCode(HttpStatus.OK)
  async getShopCount(@Query() query: ShopCountQueryDto) {
    const result = await this.shopsService.getCount({
      area: query.area,
      lat:  query.lat,
      lng:  query.lng,
    });

    return {
      success: true,
      data: {
        area:   result.area,
        count:  result.count,
      },
      meta: {
        cached:    result.cached,
        cacheTtlSeconds: 300,
      },
    };
  }
}
