import { inject, injectable } from 'inversify';
import { TYPES } from 'types';
import { ProductRepository } from '../repository/ProductRepository';
import { Result } from 'src/domain/util/Result';
import { Product } from 'src/domain/model/Product';

@injectable()
export class AddProductUsecase {
  @inject(TYPES.ProductRepository) private productRepository!: ProductRepository;
  invoke(
    title: string,
    description: string,
    category: string,
    price: number,
    shop: string,
    images: string[]
  ): Promise<Result<Product>> {
    return this.productRepository.addProduct(title, description, category, price, shop, images);
  }
}
