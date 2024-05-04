import { AddProductToCartUsecase } from '@src/domain/usecase/AddProductToCartUsecase';
import { GetCartItemsUsecase } from '@src/domain/usecase/GetCartItemsUsecase';
import { UserTokenValidationUsecase } from '@src/domain/usecase/UserTokenValidationUsecase';
import express from 'express';
import { container } from 'inversify.config';
import { TYPES } from 'types';
const router = express.Router();

router.get("/list", async (req, res) => {
  const getCartItemsUsecase = container.get<GetCartItemsUsecase>(TYPES.GetCartItemsUsecase)
  const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
  const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
  switch (userTokenValidationResult.type) {
    case 'success': {
      const result = await getCartItemsUsecase.invoke(userTokenValidationResult.data.username)
      switch (result.type) {
        case 'success': {
            return res.json(result.data)    
        }
        case 'failure': {
            return res.sendStatus(result.statusCode)
        }
      }
    }
    case 'failure':
      return res.sendStatus(userTokenValidationResult.statusCode);
  }
})

router.post("/addProductToCart", async (req, res) => {
    const addProductToCartUsecase = container.get<AddProductToCartUsecase>(TYPES.AddProductToCartUsecase)
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    switch (userTokenValidationResult.type) {
        case 'success': {
          const result = await addProductToCartUsecase.invoke(userTokenValidationResult.data.username, req.body.productId)
          switch (result.type) {
            case 'success': {
                return res.json(result.data)    
            }
            case 'failure': {
                return res.sendStatus(result.statusCode)
            }
          }
        }
        case 'failure':
          return res.sendStatus(userTokenValidationResult.statusCode);
    }
})

export default router;