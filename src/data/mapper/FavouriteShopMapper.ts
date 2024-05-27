import { FavouriteShopDocument } from "@src/data/entity/FavouriteShop"
import { FavouriteShop } from "@src/domain/model/FavouriteShop"


export const favouriteShopDocumentToFavouriteShop = (favShop: FavouriteShopDocument): FavouriteShop => {
    return {
        id: favShop._id.toString(),
        userId: favShop.userId,
        shopId: favShop.shopId,
        dateCreated: new Date(favShop.dateCreated.toString())
    }
}