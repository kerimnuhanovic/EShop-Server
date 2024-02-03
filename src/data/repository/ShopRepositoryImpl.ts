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

}