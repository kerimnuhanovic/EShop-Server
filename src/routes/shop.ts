import { AddReviewUsecase } from '@src/domain/usecase/AddReviewUsecase';
import { CalculateShopRatingUsecase } from '@src/domain/usecase/CalculateShopRatingUsecase';
import { GetAllShopsUsecase } from '@src/domain/usecase/GetAllShopsUsecase';
import { GetPopularShopsUsecase } from '@src/domain/usecase/GetPopularShopsUsecase';
import { GetShopProductsUsecase } from '@src/domain/usecase/GetShopProductsUsecase';
import { GetShopReviewsUsecase } from '@src/domain/usecase/GetShopReviewsUsecase';
import { GetShopUsecase } from '@src/domain/usecase/GetShopUsecase';
import { UserTokenValidationUsecase } from '@src/domain/usecase/UserTokenValidationUsecase';
import express from 'express';
import { container } from 'inversify.config';
import { TYPES } from 'types';
const router = express.Router();

router.get("/popularShops", async (req, res) => {
  const getPopularShopsUsecase = container.get<GetPopularShopsUsecase>(TYPES.GetPopularShopsUsecase)
  const result = await getPopularShopsUsecase.invoke()
  switch (result.type) {
    case 'success':
      return res.json(result.data);
    case 'failure':
      return res.sendStatus(result.statusCode)  
  }
})

router.get("/allShops/:offset", async (req, res) => {
  const getAllShopsUsecase = container.get<GetAllShopsUsecase>(TYPES.GetAllShopsUsecase)
  const result = await getAllShopsUsecase.invoke(parseInt(req.params.offset))
  switch (result.type) {
    case 'success':
      return res.json(result.data);
    case 'failure':
      return res.sendStatus(result.statusCode)  
  }
})

router.get('/getShop/:id', async (req, res) => {
    const getShopUsecase = container.get<GetShopUsecase>(TYPES.GetShopUsecase)
    const result = await getShopUsecase.invoke(req.params.id)
    switch (result.type) {
        case 'success':
          return res.json(result.data);
        case 'failure':
          return res.sendStatus(result.statusCode)  
    }
})

router.get("/getShopProducts/:shopId", async (req, res) => {
  const getShopProductsUsecase = container.get<GetShopProductsUsecase>(TYPES.GetShopProductsUsecase)
  const result = await getShopProductsUsecase.invoke(req.params.shopId)
  switch (result.type) {
    case 'success':
      return res.json(result.data);
    case 'failure':
      return res.sendStatus(result.statusCode)  
  }
})

router.get("/reviews/:shopId", async (req, res) => {
  const getShopReviewsUsecase = container.get<GetShopReviewsUsecase>(TYPES.GetShopReviewsUsecase)
  const calculateShopRatingUsecase = container.get<CalculateShopRatingUsecase>(TYPES.CalculateShopRatingUsecase)
  const result = await getShopReviewsUsecase.invoke(req.params.shopId)
  switch (result.type) {
    case 'success':
      return res.json({
        rating: calculateShopRatingUsecase.invoke(result.data),
        data: result.data
      });
    case 'failure':
      return res.sendStatus(result.statusCode)  
  }
})

router.post('/review/:shopId', async (req, res) => {
  const addReviewUsecase = container.get<AddReviewUsecase>(TYPES.AddReviewUsecase)
  const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
  const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
  switch (userTokenValidationResult.type) {
    case 'success': {
      const result = await addReviewUsecase.invoke(
        req.params.shopId, 
        userTokenValidationResult.data.username, 
        userTokenValidationResult.data.profileImage,
        req.body.comment, 
        req.body.rating
      )
      switch (result.type) {
        case 'success':
          return res.json(result.data);
        case 'failure':
          return res.sendStatus(result.statusCode);
      }
    }
    case 'failure': {
      return res.sendStatus(userTokenValidationResult.statusCode);
    }
  }
})


export default router;