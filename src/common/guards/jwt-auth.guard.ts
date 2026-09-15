import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** JWT Auth guard — apply on any controller or route that requires authentication */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
