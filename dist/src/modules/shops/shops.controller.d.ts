import { ShopsService } from './shops.service';
import { ShopCountQueryDto } from './dto/shop-count-query.dto';
export declare class ShopsController {
    private readonly shopsService;
    constructor(shopsService: ShopsService);
    getShopCount(query: ShopCountQueryDto): Promise<{
        success: boolean;
        data: {
            area: string;
            count: number;
        };
        meta: {
            cached: boolean;
            cacheTtlSeconds: number;
        };
    }>;
}
