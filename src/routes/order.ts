import { AddOrderUsecase } from '@src/domain/usecase/AddOrderUsecase';
import { ListCustomerOrdersUsecase } from '@src/domain/usecase/ListCustomerOrdersUsecase';
import { ListShopOrdersUsecase } from '@src/domain/usecase/ListShopOrdersUsecase';
import { UpdateOrderStatusUsecase } from '@src/domain/usecase/UpdateOrderStatusUsecase';
import { UserTokenValidationUsecase } from '@src/domain/usecase/UserTokenValidationUsecase';
import { STATUS_200 } from '@src/domain/util/constants';
import express from 'express';
import { container } from 'inversify.config';
import { TYPES } from 'types';
const router = express.Router();

router.get("/customer-orders", async (req, res) => {
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    const listCustomerOrdersUsecase = container.get<ListCustomerOrdersUsecase>(TYPES.ListCustomerOrdersUsecase)
    switch (userTokenValidationResult.type) {
        case 'success': {
            const result = await listCustomerOrdersUsecase.invoke(userTokenValidationResult.data.username)
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

router.get("/shop-orders", async (req, res) => {
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    const listShopOrdersUsecase = container.get<ListShopOrdersUsecase>(TYPES.ListShopOrdersUsecase)
    switch (userTokenValidationResult.type) {
        case 'success': {
            const result = await listShopOrdersUsecase.invoke(userTokenValidationResult.data.username)
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

router.patch("/status", async (req, res) => {
    const updateOrderStatusUsecase = container.get<UpdateOrderStatusUsecase>(TYPES.UpdateOrderStatusUsecase)
    const result = await updateOrderStatusUsecase.invoke(req.body.id, req.body.orderDetailsId, req.body.status)
    switch (result.type) {
        case 'success': {
            return res.sendStatus(STATUS_200)
        }
        case 'failure': {
            return res.sendStatus(result.statusCode)
        }
    }
})

router.post("/add", async (req, res) => {
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"]) 
    const addOrderUsecase = container.get<AddOrderUsecase>(TYPES.AddOrderUsecase)
    switch (userTokenValidationResult.type) {
        case 'success': {
            const result = await addOrderUsecase.invoke(userTokenValidationResult.data.username, req.body.orderDetails)
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

export default router;