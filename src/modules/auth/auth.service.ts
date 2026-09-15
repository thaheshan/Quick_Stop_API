import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService }    from '@nestjs/jwt';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RegisterDto }   from './dto/register.dto';
import { LoginDto }      from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma:  PrismaService,
    private jwtSvc:  JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { phone: dto.phone }] },
    });
    if (exists) throw new ConflictException('Email or phone already registered');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { fullName: dto.fullName, email: dto.email, phone: dto.phone, passwordHash },
    });

    return { user: this.sanitize(user), token: this.sign(user) };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return { user: this.sanitize(user), token: this.sign(user) };
  }

  private sign(user: { id: string; email: string }) {
    return this.jwtSvc.sign({ sub: user.id, email: user.email });
  }

  private sanitize(user: any) {
    const { passwordHash, ...safe } = user;
    return safe;
  }
}
