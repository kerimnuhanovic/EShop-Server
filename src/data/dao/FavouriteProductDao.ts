import { FavouriteProductDocument, FavouriteProductEntity } from "@src/data/entity/FavouriteProduct";
import { injectable } from "inversify";

export interface FavouriteProductDao {
    addProduct(userId: string, productId: string): Promise<FavouriteProductDocument>;
    listFavouriteProducts(userId: string): Promise<FavouriteProductDocument[]>;
    deleteProduct(userId: string, productId: string): Promise<number>;
    isProductFavourite(userId: string, productId: string): Promise<boolean>;
}

@injectable()
export class FavouriteProductDaoImpl implements FavouriteProductDao {
    async addProduct(userId: string, productId: string): Promise<FavouriteProductDocument> {
        const favouriteProduct = new FavouriteProductEntity({
            userId: userId,
            productId: productId
        })
        return await favouriteProduct.save();
    }

    async listFavouriteProducts(userId: string): Promise<FavouriteProductDocument[]> {
        const favouriteProducts = await FavouriteProductEntity.find({
            userId: userId
        })
        return favouriteProducts;
    }

    async deleteProduct(userId: string, productId: string): Promise<number> {
        const result = await FavouriteProductEntity.deleteOne({
            userId: userId,
            productId: productId
        })

        return result.deletedCount;
    }

    async isProductFavourite(userId: string, productId: string): Promise<boolean> {
        const result = await FavouriteProductEntity.find({
            userId: userId,
            productId: productId
        })
        if (result.length !== 0) {
            return true;
        } else return false;
    }

}