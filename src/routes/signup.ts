import { CreateTokenUsecase } from '@src/domain/usecase/CreateTokenUsecase';
import { RegisterUserUsecase } from '@src/domain/usecase/RegisterUserUsecase';
import express from 'express';
import { container } from 'inversify.config';
import { TYPES } from 'types';
const router = express.Router();
import multer from 'multer';
import { StoreImageRepository } from '@src/domain/repository/StoreImageRepository';

const upload = multer({ storage: container.get<StoreImageRepository>(TYPES.StoreImageRepository).storage });

router.post('/', upload.single('profileImage'), async (req, res) => {
  const registerUserUsecase = container.get<RegisterUserUsecase>(TYPES.RegisterUserUsecase);
  const createTokenUsecase = container.get<CreateTokenUsecase>(TYPES.CreateTokenUsecase);
  const result = await registerUserUsecase.invoke(
    req.body.name,
    req.body.surname,
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
      console.log('USAO');
      res.sendStatus(result.statusCode);
  }
});

export default router;
