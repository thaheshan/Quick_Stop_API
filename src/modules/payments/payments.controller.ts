import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard }    from '../../common/guards/jwt-auth.guard';
import { CurrentUser }     from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private svc: PaymentsService) {}

  @Post('initiate')
  initiate(@Body('offerId') offerId: string, @CurrentUser() user: any) {
    return this.svc.initiate(offerId, user.id);
  }

  @Post(':id/verify')
  verify(@Param('id') id: string, @Body('gatewayRef') gatewayRef: string) {
    return this.svc.verify(id, gatewayRef);
  }

  @Get('my')
  myPayments(@CurrentUser() user: any) {
    return this.svc.getMyPayments(user.id);
  }
}
