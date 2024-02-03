import { injectable } from "inversify";
import { UserDocument, UserEntity } from "../entity/User";
const { ObjectId } = require('mongoose').Types;

export interface ShopDao {
    getShopById(id: string): Promise<UserDocument | null>
}

@injectable()
export class ShopDaoImpl implements ShopDao {
    async getShopById(id: string): Promise<UserDocument | null> {
        try {
            const shop = await UserEntity.findOne({
                $or: [
                    {_id: ObjectId.isValid(id) ? id : null},
                    {username: id}
                ]
              })
            return shop
        } catch(e) {
            throw e
        }
    } 
}