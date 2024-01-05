import { AddProductUsecase } from '@src/domain/usecase/AddProductUsecase';
import express from 'express';
import { container } from 'inversify.config';
import { TYPES } from 'types';
import { UserTokenValidationUsecase } from '@src/domain/usecase/UserTokenValidationUsecase';
import multer from 'multer';
import { StoreImageRepository } from '@src/domain/repository/StoreImageRepository';

const storeImageRepository = container.get<StoreImageRepository>(TYPES.StoreImageRepository);
const upload = multer({ storage: storeImageRepository.multiStorage });
const router = express.Router();

router.post('/addProduct', upload.array('productImages[]'), async (req, res) => {
  const addProductusecase = container.get<AddProductUsecase>(TYPES.AddProductUsecase);
  const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
  const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
  switch (userTokenValidationResult.type) {
    case 'success': {
      const result = await addProductusecase.invoke(
        req.body.title,
        req.body.description,
        req.body.category,
        req.body.price,
        userTokenValidationResult.data,
        storeImageRepository.files
      );
      switch (result.type) {
        case 'success':
          return res.json(result.data);
        case 'failure':
          storeImageRepository.deleteImages(storeImageRepository.files)
          return res.sendStatus(result.statusCode);
      }
    }
    case 'failure':
      storeImageRepository.deleteImages(storeImageRepository.files)
      return res.sendStatus(userTokenValidationResult.statusCode);
  }
  
});

export default router;
