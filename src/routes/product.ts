import { AddProductUsecase } from '@src/domain/usecase/AddProductUsecase';
import express from 'express';
import { container } from 'inversify.config';
import { TYPES } from 'types';
const router = express.Router();

router.post('/addProduct', async (req, res) => {
  const addProductusecase = container.get<AddProductUsecase>(TYPES.AddProductUsecase);
  // shop should be extracted from token sent by client
  const result = await addProductusecase.invoke(
    req.body.title,
    req.body.description,
    req.body.category,
    req.body.price,
    req.body.shop,
    req.body.images
  );
  switch (result.type) {
    case 'success':
      return res.json(result.data);
    case 'failure':
      res.sendStatus(result.statusCode);
  }
});

export default router;
