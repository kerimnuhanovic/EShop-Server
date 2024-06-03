import { FavouriteProduct } from "@src/domain/model/FavouriteProduct";
import { FavouriteProductRepository } from "@src/domain/repository/FavouriteProductRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class AddFavouriteProductUsecase {
    @inject(TYPES.FavouriteProductRepository) private favouriteProductRepository!: FavouriteProductRepository
    invoke(userId: string, productId: string): Promise<Result<FavouriteProduct>> {
        return this.favouriteProductRepository.addProduct(userId, productId);
    }
}