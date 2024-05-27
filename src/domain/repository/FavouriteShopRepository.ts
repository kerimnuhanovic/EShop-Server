import { FavouriteShop } from "@src/domain/model/FavouriteShop";
import { Shop } from "@src/domain/model/Shop";
import { Result } from "@src/domain/util/Result";

export interface FavouriteShopRepository {
    addShop(userId: string, shopId: string): Promise<Result<FavouriteShop>>;
    listShops(userId: string): Promise<Result<Shop[]>>;
    deleteShop(userId: string, shopId: string): Promise<Result<number>>;
    isShopFavourite(userId: string, productId: string): Promise<Result<boolean>>;
}