import { AddOrderUsecase } from '@src/domain/usecase/AddOrderUsecase';
import { ListCustomerOrdersUsecase } from '@src/domain/usecase/ListCustomerOrdersUsecase';
import { UserTokenValidationUsecase } from '@src/domain/usecase/UserTokenValidationUsecase';
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