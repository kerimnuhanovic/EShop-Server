import { inject, injectable } from "inversify";
import { Product } from "../model/Product";
import { TYPES } from "types";
import { ProductRepository } from "../repository/ProductRepository";
import { Result } from "../util/Result";

@injectable()
export class GetPopularProductsUsecase {
    @inject(TYPES.ProductRepository) private productRepository!: ProductRepository
    invoke(): Promise<Result<Product[]>> {
        return this.productRepository.getPopularProducts()
    }
}