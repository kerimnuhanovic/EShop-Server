import { FavouriteProductRepository } from "@src/domain/repository/FavouriteProductRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class DeleteFavouriteProductUsecase {
    @inject(TYPES.FavouriteProductRepository) private favouriteProductRepository!: FavouriteProductRepository
    invoke(userId: string, productId: string): Promise<Result<number>> {
        return this.favouriteProductRepository.deleteProduct(userId, productId);
    }
}