import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService }  from '../../common/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { AddPricingRuleDto } from './dto/add-pricing-rule.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  create(ownerId: string, dto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: { ...dto, ownerId },
    });
  }

  findAll(filters: { location?: string; type?: string }) {
    return this.prisma.vehicle.findMany({
      where: {
        status:     'ACTIVE',
        isVerified: true,
        ...(filters.location && { location: { contains: filters.location, mode: 'insensitive' } }),
        ...(filters.type     && { type: filters.type as any }),
      },
      include: { pricingRules: true },
    });
  }

  async findOne(id: string) {
    const v = await this.prisma.vehicle.findUnique({ where: { id }, include: { pricingRules: true } });
    if (!v) throw new NotFoundException('Vehicle not found');
    return v;
  }

  findByOwner(ownerId: string) {
    return this.prisma.vehicle.findMany({ where: { ownerId }, include: { pricingRules: true } });
  }

  addPricingRule(vehicleId: string, dto: AddPricingRuleDto) {
    return this.prisma.pricingRule.create({ data: { vehicleId, ...dto } });
  }
}
