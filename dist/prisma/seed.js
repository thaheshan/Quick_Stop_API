"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding Vroomy database...');
    const passwordHash = await bcrypt.hash('Password123!', 10);
    const user = await prisma.user.upsert({
        where: { email: 'demo@vroomy.lk' },
        update: {},
        create: {
            email: 'demo@vroomy.lk',
            phone: '+94771234567',
            fullName: 'Roshan Perera',
            passwordHash,
            isVerifiedOwner: true,
            hasVerifiedLicense: true,
            isPhoneVerified: true,
        },
    });
    await prisma.vehicle.upsert({
        where: { plateNumber: 'WP-CAB-1234' },
        update: {},
        create: {
            ownerId: user.id,
            type: client_1.VehicleType.CAR,
            make: 'Toyota',
            model: 'Aqua',
            year: 2019,
            plateNumber: 'WP-CAB-1234',
            location: 'Colombo 3',
            basePriceLKR: 4500,
            status: client_1.VehicleStatus.ACTIVE,
            isVerified: true,
            photos: [],
            pricingRules: {
                create: [{ label: 'Weekend Premium', multiplier: 1.25 }],
            },
        },
    });
    console.log('✅ Seeding complete.');
}
main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map