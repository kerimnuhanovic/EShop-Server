import { inject, injectable } from "inversify";
import { TYPES } from "types";
import { handleMongoError } from '../util/errorHandlingUtil';
import { MongoError } from 'mongodb';
import { notFound, serverError } from '@src/strings/strings';
import { Result, failure, success } from "@src/domain/util/Result";
import { FavouriteShopRepository } from "@src/domain/repository/FavouriteShopRepository";
import { ShopDao } from "@src/data/dao/ShopDao";
import { FavouriteShop } from "@src/domain/model/FavouriteShop";
import { favouriteShopDocumentToFavouriteShop } from "@src/data/mapper/FavouriteShopMapper";
import { FavouriteShopDao } from "@src/data/dao/FavouriteShopDao";
import { Shop } from "@src/domain/model/Shop";
import { userDocumentToShop } from "@src/data/mapper/ShopMapper";

@injectable()
export class FavouriteShopRepositoryImpl implements FavouriteShopRepository {
    @inject(TYPES.FavouriteShopDao) private favouriteShopDao!: FavouriteShopDao
    @inject(TYPES.ShopDao) private shopDao!: ShopDao
    async addShop(userId: string, shopId: string): Promise<Result<FavouriteShop>> {
        try {
            const favouriteShopDocument = await this.favouriteShopDao.addShop(userId, shopId);
            return success(favouriteShopDocumentToFavouriteShop(favouriteShopDocument));
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }
    async listShops(userId: string): Promise<Result<Shop[]>> {
        try {
            const favouriteShops = await this.favouriteShopDao.listFavouriteShops(userId);
            const shopDocuments = await Promise.all(
                favouriteShops.map((favShopDocument) => this.shopDao.getShopById(favShopDocument.id))
            )
            return success(shopDocuments.map((shopDocument) => userDocumentToShop(shopDocument!)))
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }

    async deleteShop(userId: string, shopId: string): Promise<Result<number>> {
        try {
            const result = await this.favouriteShopDao.deleteShop(userId, shopId);
            return success(result);
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }

    async isShopFavourite(userId: string, shopId: string): Promise<Result<boolean>> {
        try {
            const result = await this.favouriteShopDao.isShopFavourite(userId, shopId);
            return success(result);
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }
}