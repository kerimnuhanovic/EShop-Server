import express from 'express';
const router = express.Router();
import * as core from 'express-serve-static-core';
import { AuthenticateUserUserCase } from '@src/domain/usecase/AuthenticateUserUsecase';
import { container } from 'inversify.config';
import { TYPES } from 'types';
import { Response, Request } from 'express';
import { UserEntity } from '@src/data/entity/User';
import { invalidCredentials } from '@src/strings/strings';

interface AuthRequest {
  userIdentifier: string;
  password: string;
}

router.post('/', async (req: Request<{}, {}, AuthRequest>, res: Response) => {
  const authenticateUserUsecase = container.get<AuthenticateUserUserCase>(TYPES.AuthenticateUserUsecase);
  const user = await authenticateUserUsecase.invoke(req.body.userIdentifier, req.body.password);
  if (user == null) {
    return res.status(401).json(invalidCredentials);
  }
  res.json(user);
});

export default router;
