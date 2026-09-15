import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where:  { id: userId },
      select: { id: true, fullName: true, email: true, phone: true,
                isVerifiedOwner: true, hasVerifiedLicense: true,
                isPhoneVerified: true, createdAt: true },
    });
  }

  updateProfile(userId: string, data: { fullName?: string }) {
    return this.prisma.user.update({ where: { id: userId }, data });
  }
}
