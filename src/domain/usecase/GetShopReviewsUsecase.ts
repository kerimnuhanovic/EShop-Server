import { Review } from "@src/domain/model/Review";
import { ShopRepository } from "@src/domain/repository/ShopRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class GetShopReviewsUsecase {
    @inject(TYPES.ShopRepository) private shopRepository!: ShopRepository
    invoke(shopId: string): Promise<Result<Review[]>> {
        return this.shopRepository.getShopReviews(shopId)
    }
}