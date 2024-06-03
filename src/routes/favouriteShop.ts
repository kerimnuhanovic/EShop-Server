import { AddFavouriteShopUsecase } from '@src/domain/usecase/AddFavouriteShopUsecase';
import { CheckIsShopFavouriteUsecase } from '@src/domain/usecase/CheckIsShopFavouriteUsecase';
import { DeleteFavouriteShopUsecase } from '@src/domain/usecase/DeleteFavouriteShopUsecase';
import { ListFavouriteShopsUsecase } from '@src/domain/usecase/ListFavouriteShopsUsecase';
import { UserTokenValidationUsecase } from '@src/domain/usecase/UserTokenValidationUsecase';
import { STATUS_200 } from '@src/domain/util/constants';
import express from 'express';
import { container } from 'inversify.config';
import { TYPES } from 'types';
const router = express.Router();

router.get("/", async (req, res) => {
    const listFavouriteShopsUsecase = container.get<ListFavouriteShopsUsecase>(TYPES.ListFavouriteShopsUsecase)
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    switch (userTokenValidationResult.type) {
        case 'success': {
            const result = await listFavouriteShopsUsecase.invoke(userTokenValidationResult.data.username)
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

router.get("/isShopFavourite/:shopId", async (req, res) => {
    const checkIsShopFavouriteUsecase = container.get<CheckIsShopFavouriteUsecase>(TYPES.CheckIsShopFavouriteUsecase)
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    switch (userTokenValidationResult.type) {
        case 'success': {
            const result = await checkIsShopFavouriteUsecase.invoke(userTokenValidationResult.data.username, req.params.shopId)
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

router.post("/addShop/:shopId", async (req, res) => {
    const addFavouriteShopUsecase = container.get<AddFavouriteShopUsecase>(TYPES.AddFavouriteShopUsecase)
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    switch (userTokenValidationResult.type) {
        case 'success': {
            const result = await addFavouriteShopUsecase.invoke(userTokenValidationResult.data.username, req.params.shopId);
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

router.delete("/:shopId", async (req, res) => {
    const deleteFavouriteShopUsecase = container.get<DeleteFavouriteShopUsecase>(TYPES.DeleteFavouriteShopUsecase)
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    switch (userTokenValidationResult.type) {
        case 'success': {
            const result = await deleteFavouriteShopUsecase.invoke(userTokenValidationResult.data.username, req.params.shopId)
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