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
  getAllProducts(offset: number, searchQuery?: String | null, filteredCategories?: string[], sortBy?: string, orderBy?: string): Promise<Result<Product[]>>
  getProduct(productId: string): Promise<Result<Product>>
}
