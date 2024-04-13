import { Review } from "@src/domain/model/Review";
import { injectable } from "inversify";

@injectable()
export class CalculateShopRatingUsecase {
    invoke(shopReviews: Review[]): number {
        if (shopReviews.length === 0) return 0.0
        const ratings = shopReviews.map((review) => review.rating)
        const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue)
        return sum / ratings.length
    }
}