import { FavouriteShopDocument, FavouriteShopEntity } from "@src/data/entity/FavouriteShop";
import { injectable } from "inversify";

export interface FavouriteShopDao {
    addShop(userId: string, productId: string): Promise<FavouriteShopDocument>;
    listFavouriteShops(userId: string): Promise<FavouriteShopDocument[]>;
    deleteShop(userId: string, productId: string): Promise<number>;
    isShopFavourite(userId: string, productId: string): Promise<boolean>;
}

@injectable()
export class FavouriteShopDaoImpl implements FavouriteShopDao {
    async addShop(userId: string, shopId: string): Promise<FavouriteShopDocument> {
        const favouriteProduct = new FavouriteShopEntity({
            userId: userId,
            shopId: shopId
        })
        return await favouriteProduct.save();
    }

    async listFavouriteShops(userId: string): Promise<FavouriteShopDocument[]> {
        const favouriteProducts = await FavouriteShopEntity.find({
            userId: userId
        })
        return favouriteProducts;
    }

    async deleteShop(userId: string, shopId: string): Promise<number> {
        const result = await FavouriteShopEntity.deleteOne({
            userId: userId,
            shopId: shopId
        })

        return result.deletedCount;
    }

    async isShopFavourite(userId: string, shopId: string): Promise<boolean> {
        const result = await FavouriteShopEntity.find({
            userId: userId,
            shopId: shopId
        })
        if (result.length !== 0) {
            return true;
        } else return false;
    }

}