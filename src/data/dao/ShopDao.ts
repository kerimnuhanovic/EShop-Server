import { injectable } from "inversify";
import { UserDocument, UserEntity } from "../entity/User";
import { ProductDocument, ProductEntity } from "@src/data/entity/Product";
import { ReviewDocument, ReviewEntity } from "@src/data/entity/Review";
import { OrderBy } from "@src/domain/util/SortAndOrderUtils";
const { ObjectId } = require('mongoose').Types;

export interface ShopDao {
    getShopById(id: string): Promise<UserDocument | null>
    getAllShops(offset: number, searchQuery?: String | null, filteredCategories?: string[], sortBy?: string, orderBy?: string): Promise<UserDocument[]>
    getPopularShops(): Promise<UserDocument[]>
    getShopProducts(shopId: string): Promise<ProductDocument[]>
    getShopReviews(shopId: string): Promise<ReviewDocument[]>
    addShopReview(shopId: string, authorId: string, authorProfileImage: string, comment: string, rating: string): Promise<ReviewDocument>
}

@injectable()
export class ShopDaoImpl implements ShopDao {
    async getShopById(id: string): Promise<UserDocument | null> {
        try {
            const shop = await UserEntity.findOne({
                $or: [
                    {_id: ObjectId.isValid(id) ? id : null},
                    {username: id}
                ]
              })
            return shop
        } catch(e) {
            throw e
        }
    } 

    async getAllShops(offset: number, searchQuery?: String | null, filteredCategories?: string[], sortBy?: string, orderBy?: string): Promise<UserDocument[]> {
        try {
            // set limit to 20 when more shops are added to db
            const shops = await UserEntity.find({
                $and: [
                    {userType: "Shop"},
                    {username: {$regex: searchQuery ?? '', $options: "i"}},
                    filteredCategories ? {shopCategories: {
                        $elemMatch: { $in: filteredCategories }
                    }} : {}
                ]
            }).skip(offset).limit(5).sort([[sortBy ? sortBy : "username", orderBy === OrderBy.ASC ? 1 : -1]])
            return shops;
          } catch (e) {
            throw e;
          }
    }

    async getPopularShops(): Promise<UserDocument[]> {
        try {
            // Update this to retrieve most popular shops once reviews are implemented
            const shops = await UserEntity.find({}) 
            return shops;   
        } catch (e) {
            throw e;
        }
    }

    async getShopProducts(shopId: string): Promise<ProductDocument[]> {
        try {
            const products = await ProductEntity.find({
                shop: shopId
            })
            return products
        } catch (e) {
            throw e;
        }
    }

    async getShopReviews(shopId: string): Promise<ReviewDocument[]> {
        try {
            const shopReviews = ReviewEntity.find({
                shopId: shopId
            })
            return shopReviews
        } catch (e) {
            throw e;
        }
    }

    async addShopReview(shopId: string, authorId: string, authorProfileImage: string, comment: string, rating: string): Promise<ReviewDocument> {
        const review = new ReviewEntity({
            shopId: shopId,
            authorId: authorId,
            authorProfileImage: authorProfileImage,
            comment: comment,
            rating: rating
        })
        return await review.save()
    }
}