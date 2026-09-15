import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule }    from './common/prisma/prisma.module';
import { AuthModule }      from './modules/auth/auth.module';
import { UsersModule }     from './modules/users/users.module';
import { VehiclesModule }  from './modules/vehicles/vehicles.module';
import { BookingsModule }  from './modules/bookings/bookings.module';
import { ChatModule }      from './modules/chat/chat.module';
import { PaymentsModule }  from './modules/payments/payments.module';

@Module({
  imports: [
    // Env config — available globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Rate limiting — 100 req / 60s per IP
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),

    // Database
    PrismaModule,

    // Feature modules
    AuthModule,
    UsersModule,
    VehiclesModule,
    BookingsModule,
    ChatModule,
    PaymentsModule,
  ],
})
export class AppModule {}
