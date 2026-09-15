import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** Injects the authenticated user from JWT payload into controller params */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
