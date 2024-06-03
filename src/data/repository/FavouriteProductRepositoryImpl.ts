import { FavouriteProductDao } from "@src/data/dao/FavouriteProductDao";
import { favouriteProductDocumentToFavouriteProduct } from "@src/data/mapper/FavouriteProductMapper";
import { FavouriteProduct } from "@src/domain/model/FavouriteProduct";
import { Product } from "@src/domain/model/Product";
import { FavouriteProductRepository } from "@src/domain/repository/FavouriteProductRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "types";
import { handleMongoError } from '../util/errorHandlingUtil';
import { MongoError } from 'mongodb';
import { notFound, serverError } from '@src/strings/strings';
import { Result, failure, success } from "@src/domain/util/Result";
import { ProductDao } from "@src/data/dao/ProductDao";
import { productDocumentToProduct } from "@src/data/mapper/ProductMapper";

@injectable()
export class FavouriteProductRepositoryImpl implements FavouriteProductRepository {
    @inject(TYPES.FavouriteProductDao) private favouriteProductDao!: FavouriteProductDao
    @inject(TYPES.ProductDao) private productDao!: ProductDao
    async addProduct(userId: string, productId: string): Promise<Result<FavouriteProduct>> {
        try {
            const favouriteProductDocument = await this.favouriteProductDao.addProduct(userId, productId);
            return success(favouriteProductDocumentToFavouriteProduct(favouriteProductDocument));
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }
    async listProducts(userId: string): Promise<Result<Product[]>> {
        try {
            const favouriteProducts = await this.favouriteProductDao.listFavouriteProducts(userId);
            const productDocuments = await Promise.all(
                favouriteProducts.map((favProductDocument) => this.productDao.getProduct(favProductDocument.productId))
            )
            return success(productDocuments.map((productDocument) => productDocumentToProduct(productDocument!)))
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }

    async deleteProduct(userId: string, productId: string): Promise<Result<number>> {
        try {
            const result = await this.favouriteProductDao.deleteProduct(userId, productId);
            return success(result);
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }

    async isProductFavourite(userId: string, productId: string): Promise<Result<boolean>> {
        try {
            const result = await this.favouriteProductDao.isProductFavourite(userId, productId);
            return success(result);
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }
}