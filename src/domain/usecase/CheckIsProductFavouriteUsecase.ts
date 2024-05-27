import { FavouriteProductRepository } from "@src/domain/repository/FavouriteProductRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class CheckIsProductFavouriteUsecase {
    @inject(TYPES.FavouriteProductRepository) private favouriteProductRepository!: FavouriteProductRepository
    invoke(userId: string, productId: string): Promise<Result<boolean>> {
        return this.favouriteProductRepository.isProductFavourite(userId, productId)
    }
}