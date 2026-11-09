import { BookingsService } from './bookings.service';
import { CreateTripRequestDto } from './dto/create-trip-request.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
export declare class BookingsController {
    private svc;
    constructor(svc: BookingsService);
    postRequest(user: any, dto: CreateTripRequestDto): import(".prisma/client").Prisma.Prisma__TripRequestClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date;
        vehicleType: import(".prisma/client").$Enums.VehicleType;
        budgetCapLKR: number;
        customerId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    listRequests(location?: string): import(".prisma/client").Prisma.PrismaPromise<({
        customer: {
            id: string;
            fullName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date;
        vehicleType: import(".prisma/client").$Enums.VehicleType;
        budgetCapLKR: number;
        customerId: string;
    })[]>;
    submitOffer(user: any, dto: CreateOfferDto): import(".prisma/client").Prisma.Prisma__BroadcastOfferClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string;
        status: import(".prisma/client").$Enums.OfferStatus;
        requestId: string;
        vehicleId: string;
        proposedPriceLKR: number;
        message: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    acceptOffer(offerId: string, user: any): Promise<{
        success: boolean;
        offerId: string;
    }>;
    myRequests(user: any): import(".prisma/client").Prisma.PrismaPromise<({
        offers: ({
            owner: {
                id: string;
                fullName: string;
            };
            vehicle: {
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            ownerId: string;
            status: import(".prisma/client").$Enums.OfferStatus;
            requestId: string;
            vehicleId: string;
            proposedPriceLKR: number;
            message: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        startDate: Date;
        endDate: Date;
        vehicleType: import(".prisma/client").$Enums.VehicleType;
        budgetCapLKR: number;
        customerId: string;
    })[]>;
}
