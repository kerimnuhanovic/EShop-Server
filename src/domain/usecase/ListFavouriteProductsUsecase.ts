import { Product } from "@src/domain/model/Product";
import { FavouriteProductRepository } from "@src/domain/repository/FavouriteProductRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class ListFavouriteProductsUsecase {
    @inject(TYPES.FavouriteProductRepository) favouriteProductRepository!: FavouriteProductRepository
    invoke(userId: string): Promise<Result<Product[]>> {
        return this.favouriteProductRepository.listProducts(userId);
    }
}