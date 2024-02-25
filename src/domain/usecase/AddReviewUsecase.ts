import { Review } from "@src/domain/model/Review";
import { ShopRepository } from "@src/domain/repository/ShopRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class AddReviewUsecase {
    @inject(TYPES.ShopRepository) private shopRepository!: ShopRepository
    invoke(shopId: string, authorId: string, authorProfileImage: string, comment: string, rating: string): Promise<Result<Review>> {
        return this.shopRepository.addShopReview(shopId, authorId, authorProfileImage, comment, rating)
    }
}