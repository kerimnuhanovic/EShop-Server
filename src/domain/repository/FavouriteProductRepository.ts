import { FavouriteProduct } from "@src/domain/model/FavouriteProduct";
import { Product } from "@src/domain/model/Product";
import { Result } from "@src/domain/util/Result";

export interface FavouriteProductRepository {
    addProduct(userId: string, productId: string): Promise<Result<FavouriteProduct>>;
    listProducts(userId: string): Promise<Result<Product[]>>;
    deleteProduct(userId: string, productId: string): Promise<Result<number>>;
    isProductFavourite(userId: string, productId: string): Promise<Result<boolean>>;
}