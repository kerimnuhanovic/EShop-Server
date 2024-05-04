import express from 'express';
import { UserTokenValidationUsecase } from '@src/domain/usecase/UserTokenValidationUsecase';
import { container } from 'inversify.config';
import { TYPES } from 'types';
import { GetUserConversationsUsecase } from '@src/domain/usecase/GetUserConversationsUsecase';
import { UpdateUserConversationUsecase } from '@src/domain/usecase/UpdateUserConversationUsecase';

const router = express.Router();


router.get("/conversations", async (req, res) => {
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    switch (userTokenValidationResult.type) {
        case 'success': {
            const getUserConversationsUsecase = container.get<GetUserConversationsUsecase>(TYPES.GetUserConversationsUsecase)
            const result = await getUserConversationsUsecase.invoke(userTokenValidationResult.data.username)
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

router.patch("/conversations/:userId", async (req, res) => {
    const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
    const userTokenValidationResult = userTokenValidationUsecase.invoke(req.headers["authorization"])
    switch (userTokenValidationResult.type) {
        case 'success': {
            const getUserConversationUsecase = container.get<UpdateUserConversationUsecase>(TYPES.UpdateUserConversationUsecase)
            const result = await getUserConversationUsecase.invoke(userTokenValidationResult.data.username, req.params.userId)
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