import { FavouriteProductDocument } from "@src/data/entity/FavouriteProduct";
import { FavouriteProduct } from "@src/domain/model/FavouriteProduct";

export const favouriteProductDocumentToFavouriteProduct = (favProduct: FavouriteProductDocument): FavouriteProduct => {
    return {
        id: favProduct._id.toString(),
        userId: favProduct.userId,
        productId: favProduct.productId,
        dateCreated: new Date(favProduct.dateCreated.toString())
    }
}