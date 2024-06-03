import { Shop } from "@src/domain/model/Shop";
import { FavouriteShopRepository } from "@src/domain/repository/FavouriteShopRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class ListFavouriteShopsUsecase {
    @inject(TYPES.FavouriteShopRepository) private favouriteShopRepository!: FavouriteShopRepository
    invoke(userId: string): Promise<Result<Shop[]>> {
        return this.favouriteShopRepository.listShops(userId);
    }
}