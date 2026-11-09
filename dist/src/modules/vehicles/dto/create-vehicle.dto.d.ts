import { VehicleType } from '@prisma/client';
export declare class CreateVehicleDto {
    type: VehicleType;
    make: string;
    model: string;
    year: number;
    plateNumber: string;
    location: string;
    basePriceLKR: number;
    photos: string[];
}
