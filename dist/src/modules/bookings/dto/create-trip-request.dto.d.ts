import { VehicleType } from '@prisma/client';
export declare class CreateTripRequestDto {
    vehicleType: VehicleType;
    location: string;
    startDate: string;
    endDate: string;
    budgetCapLKR: number;
}
