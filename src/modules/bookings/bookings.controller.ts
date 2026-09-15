import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { BookingsService }      from './bookings.service';
import { CreateTripRequestDto } from './dto/create-trip-request.dto';
import { CreateOfferDto }       from './dto/create-offer.dto';
import { JwtAuthGuard }         from '../../common/guards/jwt-auth.guard';
import { CurrentUser }          from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private svc: BookingsService) {}

  /** POST /bookings/broadcast — traveller posts a trip need */
  @Post('broadcast')
  postRequest(@CurrentUser() user: any, @Body() dto: CreateTripRequestDto) {
    return this.svc.postTripRequest(user.id, dto);
  }

  /** GET /bookings/broadcast?location=Galle — owner browses open requests */
  @Get('broadcast')
  listRequests(@Query('location') location?: string) {
    return this.svc.listOpenRequests(location);
  }

  /** POST /bookings/offers — owner submits competing offer */
  @Post('offers')
  submitOffer(@CurrentUser() user: any, @Body() dto: CreateOfferDto) {
    return this.svc.submitOffer(user.id, dto);
  }

  /** POST /bookings/offers/:id/accept — traveller accepts an offer */
  @Post('offers/:id/accept')
  acceptOffer(@Param('id') offerId: string, @CurrentUser() user: any) {
    return this.svc.acceptOffer(offerId, user.id);
  }

  /** GET /bookings/my — traveller's own trip requests + incoming offers */
  @Get('my')
  myRequests(@CurrentUser() user: any) {
    return this.svc.getMyRequests(user.id);
  }
}
