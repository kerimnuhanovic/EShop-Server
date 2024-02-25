import { ReviewDocument } from "@src/data/entity/Review";
import { Review } from "@src/domain/model/Review";

export const reviewDocumentToReview = (reviewDocument: ReviewDocument): Review => {
    return {
        id: reviewDocument._id.toString(),
        shopId: reviewDocument.shopId,
        authorId: reviewDocument.authorId,
        authorProfileImage: reviewDocument.authorProfileImage,
        rating: reviewDocument.rating,
        comment: reviewDocument.comment,
        dateAdded: new Date(reviewDocument.dateAdded.toString()).toISOString()
    }
}