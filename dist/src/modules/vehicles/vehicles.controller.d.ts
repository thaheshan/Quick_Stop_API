import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { AddPricingRuleDto } from './dto/add-pricing-rule.dto';
export declare class VehiclesController {
    private svc;
    constructor(svc: VehiclesService);
    findAll(q: {
        location?: string;
        type?: string;
    }): import(".prisma/client").Prisma.PrismaPromise<({
        pricingRules: {
            id: string;
            createdAt: Date;
            label: string;
            multiplier: number;
            startDate: Date | null;
            endDate: Date | null;
            vehicleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        plateNumber: string;
        ownerId: string;
        type: import(".prisma/client").$Enums.VehicleType;
        make: string;
        model: string;
        year: number;
        location: string;
        basePriceLKR: number;
        status: import(".prisma/client").$Enums.VehicleStatus;
        isVerified: boolean;
        photos: string[];
    })[]>;
    findOne(id: string): Promise<{
        pricingRules: {
            id: string;
            createdAt: Date;
            label: string;
            multiplier: number;
            startDate: Date | null;
            endDate: Date | null;
            vehicleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        plateNumber: string;
        ownerId: string;
        type: import(".prisma/client").$Enums.VehicleType;
        make: string;
        model: string;
        year: number;
        location: string;
        basePriceLKR: number;
        status: import(".prisma/client").$Enums.VehicleStatus;
        isVerified: boolean;
        photos: string[];
    }>;
    create(user: any, dto: CreateVehicleDto): import(".prisma/client").Prisma.Prisma__VehicleClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        plateNumber: string;
        ownerId: string;
        type: import(".prisma/client").$Enums.VehicleType;
        make: string;
        model: string;
        year: number;
        location: string;
        basePriceLKR: number;
        status: import(".prisma/client").$Enums.VehicleStatus;
        isVerified: boolean;
        photos: string[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    addRule(id: string, dto: AddPricingRuleDto): import(".prisma/client").Prisma.Prisma__PricingRuleClient<{
        id: string;
        createdAt: Date;
        label: string;
        multiplier: number;
        startDate: Date | null;
        endDate: Date | null;
        vehicleId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
