import { FavouriteShopRepository } from "@src/domain/repository/FavouriteShopRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class CheckIsShopFavouriteUsecase {
    @inject(TYPES.CheckIsShopFavouriteUsecase) private favouriteShopRepostiry!: FavouriteShopRepository
    invoke(userId: string, shopId: string): Promise<Result<boolean>> {
        return this.favouriteShopRepostiry.isShopFavourite(userId, shopId);
    }
}