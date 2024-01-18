import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { authToLoginPayload } from 'src/utils/base-64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayload = authToLoginPayload(authorization);

  return loginPayload?.id;
});
