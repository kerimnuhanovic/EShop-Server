import { GetShopUsecase } from '@src/domain/usecase/GetShopUsecase';
import express from 'express';
import { container } from 'inversify.config';
import { TYPES } from 'types';
const router = express.Router();

router.get('/getShop/:id', async (req, res) => {
    const getShopUsecase = container.get<GetShopUsecase>(TYPES.GetShopUsecase)
    console.log(req.params.id)
    const result = await getShopUsecase.invoke(req.params.id)
    switch (result.type) {
        case 'success':
          return res.json(result.data);
        case 'failure':
          return res.sendStatus(result.statusCode)  
      }
})

export default router;