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
  async getPopularProducts(): Promise<Result<Product[]>> {
    try {
      const result = await this.productDao.getPopularProducts()
      const products = result.map((product) => productDocumentToProduct(product))
      return success(products)
    } catch (error) {
      if (error instanceof MongoError) {
        return handleMongoError(error);
      }
      return failure(serverError, 500);
    }
  }
  async getAllProducts(offset: number, searchQuery?: String | null, filteredCategories?: string[], sortBy?: string, orderBy?: string): Promise<Result<Product[]>> {
    try {
      const result = await this.productDao.getAllProducts(offset, searchQuery, filteredCategories, sortBy, orderBy);
      const products = result.map((product) => productDocumentToProduct(product));
      return success(products);
    } catch (error) {
      if (error instanceof MongoError) {
        return handleMongoError(error);
      }
      return failure(serverError, 500);
    }
  }
  async getProduct(productId: string): Promise<Result<Product>> {
    try {
      const result = await this.productDao.getProduct(productId)
      if (result) {
        return success(productDocumentToProduct(result))
      }
      throw new Error("Product with this id doesn't exists")
    } catch(error) {
      if (error instanceof MongoError) {
        return handleMongoError(error);
      }
      return failure(serverError, 500);
    }
  }
}
