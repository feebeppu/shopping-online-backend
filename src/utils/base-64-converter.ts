import { LoginPayloadDTO } from 'src/auth/dtos/loginPayload.dto';

export const authToLoginPayload = (
  authorization: string,
): LoginPayloadDTO | undefined => {
  const authSplited = authorization.split('.');

  if (authSplited.length < 3 || !authSplited[1]) {
    return undefined;
  }

  return JSON.parse(Buffer.from(authSplited[1], 'base64').toString('ascii'));
};
