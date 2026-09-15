import { PrismaClient, VehicleType, VehicleStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Vroomy database...');

  // Seed a test owner + customer (same user — dual registration)
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@vroomy.lk' },
    update: {},
    create: {
      email:             'demo@vroomy.lk',
      phone:             '+94771234567',
      fullName:          'Roshan Perera',
      passwordHash,
      isVerifiedOwner:   true,
      hasVerifiedLicense:true,
      isPhoneVerified:   true,
    },
  });

  // Seed a vehicle
  await prisma.vehicle.upsert({
    where: { plateNumber: 'WP-CAB-1234' },
    update: {},
    create: {
      ownerId:      user.id,
      type:         VehicleType.CAR,
      make:         'Toyota',
      model:        'Aqua',
      year:         2019,
      plateNumber:  'WP-CAB-1234',
      location:     'Colombo 3',
      basePriceLKR: 4500,
      status:       VehicleStatus.ACTIVE,
      isVerified:   true,
      photos:       [],
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
