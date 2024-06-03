import { AddFavouriteProductUsecase } from '@src/domain/usecase/AddFavouriteProductUsecase';
import { CheckIsProductFavouriteUsecase } from '@src/domain/usecase/CheckIsProductFavouriteUsecase';
import { DeleteFavouriteProductUsecase } from '@src/domain/usecase/DeleteFavouriteProductUsecase';
import { ListFavouriteProductsUsecase } from '@src/domain/usecase/ListFavouriteProductsUsecase';
import { UserTokenValidationUsecase } from '@src/domain/usecase/UserTokenValidationUsecase';
import { STATUS_200 } from '@src/domain/util/constants';
import express from 'express';
import { container } from 'inversify.config';
import { TYPES } from 'types';
const router = express.Router();

router.get("/", async (req, res) => {
    const listFavouriteProductsUsecase = container.get<ListFavouriteProductsUsecase>(TYPES.ListFavouriteProductsUsecase)
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    switch (userTokenValidationResult.type) {
        case 'success': {
            const result = await listFavouriteProductsUsecase.invoke(userTokenValidationResult.data.username)
            switch (result.type) {
                case 'success': {
                    return res.json(result.data)
                }
                case 'failure': {
                    return res.sendStatus(result.statusCode)
                }
            }
        }
        case 'failure': {
            return res.sendStatus(userTokenValidationResult.statusCode)
        }
    }
})

router.get("/isProductFavourite/:productId", async (req, res) => {
    const checkIsProductFavouriteUsecase = container.get<CheckIsProductFavouriteUsecase>(TYPES.CheckIsProductFavouriteUsecase)
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    switch (userTokenValidationResult.type) {
        case 'success': {
            const result = await checkIsProductFavouriteUsecase.invoke(userTokenValidationResult.data.username, req.params.productId)
            switch (result.type) {
                case 'success': {
                    return res.json(result.data)
                }
                case 'failure': {
                    return res.sendStatus(result.statusCode)
                }
            }
        }
        case 'failure': {
            return res.sendStatus(userTokenValidationResult.statusCode)
        }
    }
})

router.post("/addProduct/:productId", async (req, res) => {
    const addFavouriteProductUsecase = container.get<AddFavouriteProductUsecase>(TYPES.AddFavouriteProductUsecase)
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    switch (userTokenValidationResult.type) {
        case 'success': {
            const result = await addFavouriteProductUsecase.invoke(userTokenValidationResult.data.username, req.params.productId);
            switch (result.type) {
                case 'success': {
                    return res.json(result.data)
                }
                case 'failure': {
                    return res.sendStatus(result.statusCode)
                }
            }
        }
        case 'failure': {
            return res.sendStatus(userTokenValidationResult.statusCode)
        }
    }
})

router.delete("/:productId", async (req, res) => {
    const deleteFavouriteProductUsecase = container.get<DeleteFavouriteProductUsecase>(TYPES.DeleteFavouriteProductUsecase)
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    switch (userTokenValidationResult.type) {
        case 'success': {
            const result = await deleteFavouriteProductUsecase.invoke(userTokenValidationResult.data.username, req.params.productId)
            switch (result.type) {
                case 'success': {
                    return res.sendStatus(STATUS_200)
                }
                case 'failure': {
                    return res.sendStatus(result.statusCode)
                }
            }
        }
        case 'failure': {
            return res.sendStatus(userTokenValidationResult.statusCode)
        }
    }
})

export default router;