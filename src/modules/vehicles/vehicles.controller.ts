import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { VehiclesService }    from './vehicles.service';
import { CreateVehicleDto }   from './dto/create-vehicle.dto';
import { AddPricingRuleDto }  from './dto/add-pricing-rule.dto';
import { JwtAuthGuard }       from '../../common/guards/jwt-auth.guard';
import { CurrentUser }        from '../../common/decorators/current-user.decorator';

@Controller('vehicles')
export class VehiclesController {
  constructor(private svc: VehiclesService) {}

  /** GET /vehicles?location=Galle&type=CAR — browse listings */
  @Get()
  findAll(@Query() q: { location?: string; type?: string }) {
    return this.svc.findAll(q);
  }

  /** GET /vehicles/:id */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  /** POST /vehicles — create listing (requires auth) */
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateVehicleDto) {
    return this.svc.create(user.id, dto);
  }

  /** POST /vehicles/:id/pricing-rules */
  @UseGuards(JwtAuthGuard)
  @Post(':id/pricing-rules')
  addRule(@Param('id') id: string, @Body() dto: AddPricingRuleDto) {
    return this.svc.addPricingRule(id, dto);
  }
}
