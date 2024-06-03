import { FavouriteShop } from "@src/domain/model/FavouriteShop";
import { FavouriteShopRepository } from "@src/domain/repository/FavouriteShopRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class AddFavouriteShopUsecase {
    @inject(TYPES.FavouriteShopRepository) private favouriteShopRepository!: FavouriteShopRepository
    invoke(userId: string, shopId: string): Promise<Result<FavouriteShop>> {
        return this.favouriteShopRepository.addShop(userId, shopId);
    }
}