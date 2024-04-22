import express from 'express';
const router = express.Router();
import { AuthenticateUserUserCase } from '@src/domain/usecase/AuthenticateUserUsecase';
import { container } from 'inversify.config';
import { TYPES } from 'types';
import { Response, Request } from 'express';
import { invalidCredentials } from '@src/strings/strings';
import { CreateTokenUsecase } from '@src/domain/usecase/CreateTokenUsecase';

interface AuthRequest {
  userIdentifier: string;
  password: string;
}

router.get("/test", (req, res) => {
  res.json({test: "Kerim"})
})

router.post('/', async (req: Request<{}, {}, AuthRequest>, res: Response) => {
  const authenticateUserUsecase = container.get<AuthenticateUserUserCase>(TYPES.AuthenticateUserUsecase);
  const createTokenUsecase = container.get<CreateTokenUsecase>(TYPES.CreateTokenUsecase);
  const user = await authenticateUserUsecase.invoke(req.body.userIdentifier, req.body.password);
  if (user == null) {
    return res.status(401).json(invalidCredentials);
  }
  const token = createTokenUsecase.invoke(user.username, user.userType, user.profileImage);
  res.json(token);
});

export default router;
