import { AddProductUsecase } from '@src/domain/usecase/AddProductUsecase';
import express from 'express';
import { container } from 'inversify.config';
import { TYPES } from 'types';
import { UserTokenValidationUsecase } from '@src/domain/usecase/UserTokenValidationUsecase';
import multer from 'multer';
import { StoreImageRepository } from '@src/domain/repository/StoreImageRepository';
import { GetPopularProductsUsecase } from '@src/domain/usecase/GetPopularProductsUsecase';
import { GetAllProductsUsecase } from '@src/domain/usecase/GetAllProductsUsecase';
import { GetProductUsecase } from '@src/domain/usecase/GetProductsUsecase';
import { formatFilterParams } from '@src/domain/util/mapUtils';

const storeImageRepository = container.get<StoreImageRepository>(TYPES.StoreImageRepository);
const upload = multer({ storage: storeImageRepository.multiStorage });
const router = express.Router();

router.post('/addProduct', upload.array('productImages[]'), async (req, res) => {
  const addProductusecase = container.get<AddProductUsecase>(TYPES.AddProductUsecase);
  const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
  const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
  const images = req.files as Express.Multer.File[]
  const imageFilenames = images.map(image => image.filename)
  switch (userTokenValidationResult.type) {
    case 'success': {
      const result = await addProductusecase.invoke(
        req.body.title,
        req.body.description,
        req.body.category,
        req.body.price,
        userTokenValidationResult.data.username,
        imageFilenames
      );
      switch (result.type) {
        case 'success':
          return res.json(result.data);
        case 'failure':
          storeImageRepository.deleteImages(imageFilenames)
          return res.sendStatus(result.statusCode);
      }
    }
    case 'failure':
      storeImageRepository.deleteImages(imageFilenames)
      return res.sendStatus(userTokenValidationResult.statusCode);
  }
});

router.get("/popularProducts", async (req, res) => {
  const getPopularProductsUsecase = container.get<GetPopularProductsUsecase>(TYPES.GetPopularProductsUsecase)
  const result = await getPopularProductsUsecase.invoke()
  switch (result.type) {
    case 'success':
      return res.json(result.data);
    case 'failure':
      return res.sendStatus(result.statusCode)  
  }
})


router.get("/allProducts/:offset", async (req, res) => {
  const getAllProductsUsecase = container.get<GetAllProductsUsecase>(TYPES.GetAllProductsUsecase)
  const result = await getAllProductsUsecase.invoke(
    parseInt(req.params.offset), 
    req.query.searchQuery?.toString(), 
    req.query.filters as string ? formatFilterParams(req.query.filters as string) : undefined,
    req.query.sortBy as string,
    req.query.orderBy as string
  )
  
  switch (result.type) {
    case 'success':
      return res.json(result.data);
    case 'failure':
      return res.sendStatus(result.statusCode)  
  }
})

router.get("/getProduct/:id", async (req, res) => {
  const getProductUsecase = container.get<GetProductUsecase>(TYPES.GetProductUsecase)
  const result = await getProductUsecase.invoke(req.params.id)
  switch (result.type) {
    case 'success':
      return res.json(result.data);
    case 'failure':
      return res.sendStatus(result.statusCode)  
  }
})

export default router;
