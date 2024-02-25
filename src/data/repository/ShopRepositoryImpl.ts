import { Shop } from "@src/domain/model/Shop";
import { ShopRepository } from "@src/domain/repository/ShopRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "types";
import { ShopDao } from "../dao/ShopDao";
import { Result, failure, success } from "@src/domain/util/Result";
import { userDocumentToShop } from "../mapper/ShopMapper";
import { handleMongoError } from '../util/errorHandlingUtil';
import { MongoError } from 'mongodb';
import { notFound, serverError } from '@src/strings/strings';
import { Product } from "@src/domain/model/Product";
import { productDocumentToProduct } from "@src/data/mapper/ProductMapper";
import { Review } from "@src/domain/model/Review";
import { reviewDocumentToReview } from "@src/data/mapper/ReviewMapper";

@injectable()
export class ShopRepositoryImpl implements ShopRepository {
    @inject(TYPES.ShopDao) private shopDao!: ShopDao 
    async getShopById(id: string): Promise<Result<Shop>> {
        try {
          const result = await this.shopDao.getShopById(id)  
          if (result) {
            return success(userDocumentToShop(result))
          }
          return failure(notFound, 404)
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }

    async getAllShops(offset: number): Promise<Result<Shop[]>> {
      try {
          const result = await this.shopDao.getAllShops(offset)  
          if (result) {
            const shops = result.map((shopDocument) => userDocumentToShop(shopDocument))
            return success(shops)
          }
          return failure(serverError, 500)
      } catch (error) {
          if (error instanceof MongoError) {
              return handleMongoError(error);
          }
          return failure(serverError, 500);
        }
    }

    async getPopularShops(): Promise<Result<Shop[]>> {
      try {
        const result = await this.shopDao.getPopularShops()
        if (result) {
          const shops = result.map((shopDocument) => userDocumentToShop(shopDocument))
          return success(shops)
        }
        return failure(serverError, 500)
      } catch (error) {
        if (error instanceof MongoError) {
          return handleMongoError(error);
        }
        return failure(serverError, 500);
      }
    }
    
    async getShopProducts(shopId: string): Promise<Result<Product[]>> {
      try {
        const result = await this.shopDao.getShopProducts(shopId)
        if (result) {
          const products = result.map((productDocument) => productDocumentToProduct(productDocument))
          return success(products)
        }
        return failure(serverError, 500)
      } catch (error) {
        if (error instanceof MongoError) {
          return handleMongoError(error);
        }
        return failure(serverError, 500);
      }
    }

    async getShopReviews(shopId: string): Promise<Result<Review[]>> {
      try {
        const result = await this.shopDao.getShopReviews(shopId)
        if (result) {
          const shopReviews = result.map((review) => reviewDocumentToReview(review))
          return success(shopReviews)
        }
        return failure(serverError, 500)
      } catch (error) {
        if (error instanceof MongoError) {
          return handleMongoError(error);
        }
        return failure(serverError, 500);
      }
    }

    async addShopReview(shopId: string, authorId: string, authorProfileImage: string, comment: string, rating: string): Promise<Result<Review>> {
      try {
        const result = await this.shopDao.addShopReview(shopId, authorId, authorProfileImage, comment, rating)
        if (result) {
          return success(reviewDocumentToReview(result))
        }
        return failure(serverError, 500) 
      } catch (error) {
        if (error instanceof MongoError) {
          return handleMongoError(error);
        }
        return failure(serverError, 500);
      }
    }
}