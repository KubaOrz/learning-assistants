import { Request } from 'express';

type UserJwtPayload = {
  id: number;
};

type AuthRequest = Request & { user: UserJwtPayload };

export default AuthRequest;
