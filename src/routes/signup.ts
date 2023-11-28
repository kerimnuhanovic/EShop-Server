import { CreateTokenUsecase } from '@src/domain/usecase/CreateTokenUsecase';
import { RegisterUserUsecase } from '@src/domain/usecase/RegisterUserUsecase';
import express from 'express';
import { container } from 'inversify.config';
import { TYPES } from 'types';
const router = express.Router();

router.post('/', async (req, res) => {
  const registerUserUsecase = container.get<RegisterUserUsecase>(TYPES.RegisterUserUsecase);
  const createTokenUsecase = container.get<CreateTokenUsecase>(TYPES.CreateTokenUsecase);
  const result = await registerUserUsecase.invoke(
    req.body.name,
    req.body.surename,
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.userType,
    req.body.profileImage,
    req.body.shopCategories,
    req.body.shopLocations
  );
  switch (result.type) {
    case 'success':
      const token = createTokenUsecase.invoke(result.data.username, result.data.userType);
      return res.json(token);
    case 'failure':
      res.sendStatus(result.statusCode);
  }
});

export default router;
