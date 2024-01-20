import { Product } from 'src/domain/model/Product';
import { Result } from 'src/domain/util/Result';

export interface ProductRepository {
  addProduct(
    title: string,
    description: string,
    category: string,
    price: number,
    shop: string,
    images: string[]
  ): Promise<Result<Product>>;
  getPopularProducts(): Promise<Result<Product[]>>
  getAllProducts(offset: number): Promise<Result<Product[]>>
}
