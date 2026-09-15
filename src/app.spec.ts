import { Test, TestingModule } from '@nestjs/testing';
import { AuthService }   from './modules/auth/auth.service';
import { PrismaService } from './common/prisma/prisma.service';
import { JwtService }    from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const mockPrisma = {
    user: {
      findFirst:  jest.fn(),
      findUnique: jest.fn(),
      create:     jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService,    useValue: { sign: jest.fn(() => 'token') } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw on duplicate registration', async () => {
    mockPrisma.user.findFirst.mockResolvedValue({ id: '1' });
    await expect(
      service.register({ fullName: 'Test', email: 'a@b.com', phone: '+94771111111', password: 'Password1!' })
    ).rejects.toThrow();
  });
});
