import { inject, injectable } from "inversify";
import { ProductRepository } from "../repository/ProductRepository";
import { TYPES } from "types";
import { Product } from "../model/Product";
import { Result } from "../util/Result";

@injectable()
export class GetProductUsecase {
    @inject(TYPES.ProductRepository) private productRepository!: ProductRepository
    invoke(productId: string): Promise<Result<Product>> {
        return this.productRepository.getProduct(productId)
    }
}