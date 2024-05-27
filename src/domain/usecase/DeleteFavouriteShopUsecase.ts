import { FavouriteShopRepository } from "@src/domain/repository/FavouriteShopRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class DeleteFavouriteShopUsecase {
    @inject(TYPES.DeleteFavouriteShopUsecase) private favouriteShopRepository!: FavouriteShopRepository
    invoke(userId: string, shopId: string): Promise<Result<number>> {
        return this.favouriteShopRepository.deleteShop(userId, shopId);
    }
}