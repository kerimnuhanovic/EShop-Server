import { Product } from "@src/domain/model/Product";
import { Shop } from "../model/Shop";
import { Result } from "../util/Result";
import { Review } from "@src/domain/model/Review";

export interface ShopRepository {
    getShopById(id: string): Promise<Result<Shop>>
    getAllShops(offset: number, searchQuery?: String | null, filteredCategories?: string[], sortBy?: string, orderBy?: string): Promise<Result<Shop[]>>
    getPopularShops(): Promise<Result<Shop[]>>
    getShopProducts(shopId: string): Promise<Result<Product[]>>
    getShopReviews(shopId: string): Promise<Result<Review[]>>
    addShopReview(shopId: string, authorId: string, authorProfileImage: string, comment: string, rating: string): Promise<Result<Review>>
}