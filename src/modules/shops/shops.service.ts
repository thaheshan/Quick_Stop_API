import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

/** Default fallback area used when the caller supplies no location at all. */
const DEFAULT_AREA = 'Colombo 03';

/** Cache TTL: 5 minutes in milliseconds */
const CACHE_TTL_MS = 5 * 60 * 1_000;

interface CacheEntry {
  count: number;
  expiresAt: number; // Unix epoch ms
}

/**
 * ShopsService — BE-2.1 Nearby Shop Count
 *
 * Business rules implemented here:
 *  1. Resolve the lookup area from query params (area > lat/lng > default).
 *  2. Count only ACTIVE + isVerified vehicles (our current "shop" proxy).
 *  3. Cache the result per area key for CACHE_TTL_MS to reduce DB load.
 *
 * NOTE: When a dedicated `Shop` Prisma model is added, swap the
 * `this.prisma.vehicle.count(...)` call with `this.prisma.shop.count(...)`
 * and adjust the where-clause. No other files need changing.
 */
@Injectable()
export class ShopsService {
  /** Simple in-memory cache — keyed by normalised area string. */
  private readonly cache = new Map<string, CacheEntry>();

  constructor(private readonly prisma: PrismaService) {}

  // ─── Public API ─────────────────────────────────────────────────────────────

  /**
   * Returns the count of active, approved shops near the requested area.
   *
   * @param area   Named area string, e.g. "Colombo 03"
   * @param lat    Latitude  (decimal string) — used for reverse geocode key when
   *               no `area` is provided. Currently rounded to 2 d.p. for cache key.
   * @param lng    Longitude (decimal string)
   */
  async getCount(params: {
    area?: string;
    lat?: string;
    lng?: string;
  }): Promise<{ area: string; count: number; cached: boolean }> {
    const resolvedArea = this.resolveArea(params);
    const cacheKey = resolvedArea.toLowerCase().trim();

    // ── Cache hit ─────────────────────────────────────────────────────────────
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return { area: resolvedArea, count: cached.count, cached: true };
    }

    // ── DB query ──────────────────────────────────────────────────────────────
    // Using Vehicle as the "shop" proxy until a Shop model is added.
    // Filters: status = ACTIVE AND isVerified = true AND location contains area.
    const count = await this.prisma.vehicle.count({
      where: {
        status: 'ACTIVE',
        isVerified: true,
        location: {
          contains: resolvedArea,
          mode: 'insensitive',
        },
      },
    });

    // ── Populate cache ────────────────────────────────────────────────────────
    this.cache.set(cacheKey, {
      count,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return { area: resolvedArea, count, cached: false };
  }

  // ─── Private helpers ─────────────────────────────────────────────────────────

  /**
   * Priority: explicit area > lat/lng (rounded, for consistent cache keys) > default.
   */
  private resolveArea(params: { area?: string; lat?: string; lng?: string }): string {
    if (params.area) {
      return params.area.trim();
    }

    if (params.lat && params.lng) {
      // Round to 2 d.p. so small GPS noise doesn't explode cache keys.
      const lat = parseFloat(params.lat).toFixed(2);
      const lng = parseFloat(params.lng).toFixed(2);
      return `${lat},${lng}`;
    }

    return DEFAULT_AREA;
  }
}
