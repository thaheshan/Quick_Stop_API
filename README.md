# VROOMY API — NestJS Backend

**Futura Solutions (PVT) LTD** — Peer-to-Peer Vehicle Rental Marketplace, Sri Lanka

## Stack
- **Runtime**: Node.js + TypeScript
- **Framework**: NestJS 10
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: JWT + Passport
- **Real-time**: Socket.IO WebSockets (in-platform chat)
- **Rate Limiting**: @nestjs/throttler

## Project Structure

```
Quick_Stop_API/
├── prisma/
│   ├── schema.prisma          ← All DB models (User, Vehicle, Booking, Chat, Payment)
│   └── seed.ts                ← Dev seed data
├── src/
│   ├── main.ts                ← Bootstrap (port, validation pipe, CORS)
│   ├── app.module.ts          ← Root module — wires all feature modules
│   ├── common/
│   │   ├── prisma/            ← Global PrismaService + PrismaModule
│   │   ├── guards/            ← JwtAuthGuard
│   │   ├── decorators/        ← @CurrentUser()
│   │   └── utils/             ← sanitize.util.ts, currency.util.ts
│   └── modules/
│       ├── auth/              ← Register, Login, JWT Strategy
│       ├── users/             ← Profile CRUD
│       ├── vehicles/          ← Listings, Quick-list, Pricing Rules
│       ├── bookings/          ← Request-Broadcast, Offers, Accept
│       ├── chat/              ← Threads, Messages, WebSocket Gateway
│       └── payments/          ← Initiate, Verify, Commission
└── .env.example
```

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/v1/auth/register | ❌ | Dual-registration entry |
| POST | /api/v1/auth/login | ❌ | Login → JWT token |
| GET | /api/v1/users/me | ✅ | My profile |
| GET | /api/v1/vehicles | ❌ | Browse listings |
| POST | /api/v1/vehicles | ✅ | Add vehicle (owner) |
| POST | /api/v1/vehicles/:id/pricing-rules | ✅ | Add pricing rule |
| POST | /api/v1/bookings/broadcast | ✅ | Post trip request (traveller) |
| GET | /api/v1/bookings/broadcast | ✅ | Browse broadcasts (owner) |
| POST | /api/v1/bookings/offers | ✅ | Submit competing offer (owner) |
| POST | /api/v1/bookings/offers/:id/accept | ✅ | Accept offer (traveller) |
| GET | /api/v1/chat/threads | ✅ | Chat inbox |
| POST | /api/v1/chat/threads/:id/messages | ✅ | Send message (sanitized) |
| POST | /api/v1/payments/initiate | ✅ | Start payment |
| WS | /chat | ✅ | Real-time messaging namespace |

## Getting Started

```bash
# 1. Copy env and fill in your DB credentials
cp .env.example .env

# 2. Install dependencies
npm install

# 3. Generate Prisma client & run migrations
npm run db:generate
npm run db:migrate

# 4. Seed the database
npm run db:seed

# 5. Start in dev mode
npm run start:dev
```
