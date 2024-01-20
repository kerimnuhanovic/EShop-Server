import { inject, injectable } from "inversify";
import { TYPES } from "types";
import { ProductRepository } from "../repository/ProductRepository";
import { Product } from "../model/Product";
import { Result } from "../util/Result";

@injectable()
export class GetAllProductsUsecase {
    @inject(TYPES.ProductRepository) private productRepository!: ProductRepository
    invoke(offset: number): Promise<Result<Product[]>> {
        return this.productRepository.getAllProducts(offset)
    }
}