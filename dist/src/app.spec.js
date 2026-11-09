"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("./modules/auth/auth.service");
const prisma_service_1 = require("./common/prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
describe('AuthService', () => {
    let service;
    const mockPrisma = {
        user: {
            findFirst: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
                { provide: jwt_1.JwtService, useValue: { sign: jest.fn(() => 'token') } },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should throw on duplicate registration', async () => {
        mockPrisma.user.findFirst.mockResolvedValue({ id: '1' });
        await expect(service.register({ fullName: 'Test', email: 'a@b.com', phone: '+94771111111', password: 'Password1!' })).rejects.toThrow();
    });
});
//# sourceMappingURL=app.spec.js.map