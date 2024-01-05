import { Product } from '@src/domain/model/Product';
import { ProductRepository } from '@src/domain/repository/ProductRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from 'types';
import { ProductDao } from '../dao/ProductDao';
import { Result, failure, success } from '@src/domain/util/Result';
import { productDocumentToProduct } from 'src/data/mapper/ProductMapper';
import { handleMongoError } from '../util/errorHandlingUtil';
import { MongoError } from 'mongodb';
import { serverError } from '@src/strings/strings';

@injectable()
export class ProductRepositoryImpl implements ProductRepository {
  @inject(TYPES.ProductDao) private productDao!: ProductDao;
  async addProduct(
    title: string,
    description: string,
    category: string,
    price: number,
    shop: string,
    images: string[]
  ): Promise<Result<Product>> {
    try {
      const product = await this.productDao.addProduct(title, description, category, price, shop, images);
      return success(productDocumentToProduct(product));
    } catch (error) {
      if (error instanceof MongoError) {
        return handleMongoError(error);
      }
      return failure(serverError, 500);
    }
  }
}
