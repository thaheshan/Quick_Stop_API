import { PrismaService } from '../../common/prisma/prisma.service';
export declare class ShopsService {
    private readonly prisma;
    private readonly cache;
    constructor(prisma: PrismaService);
    getCount(params: {
        area?: string;
        lat?: string;
        lng?: string;
    }): Promise<{
        area: string;
        count: number;
        cached: boolean;
    }>;
    private resolveArea;
}
