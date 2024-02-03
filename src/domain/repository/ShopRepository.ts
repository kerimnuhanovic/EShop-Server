import { Shop } from "../model/Shop";
import { Result } from "../util/Result";

export interface ShopRepository {
    getShopById(id: string): Promise<Result<Shop>>
}