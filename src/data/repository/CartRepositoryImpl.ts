import { CartDao } from "@src/data/dao/CartDao";
import { cartDocumentToCartItem } from "@src/data/mapper/CartMapper";
import { handleMongoError } from "@src/data/util/errorHandlingUtil";
import { CartItem } from "@src/domain/model/CartItem";
import { CartRepository } from "@src/domain/repository/CartRepository";
import { Result, failure, success } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";
import { MongoError } from 'mongodb';
import { serverError } from '@src/strings/strings';
import { productDocumentToProduct } from "@src/data/mapper/ProductMapper";
import { Product } from "@src/domain/model/Product";

@injectable()
export class CartRepositoryImpl implements CartRepository {
    @inject(TYPES.CartDao) private cartDao!: CartDao
    async addCartItem(customerId: string, productId: string): Promise<Result<CartItem>> {
        try {
            const cartDocument = await this.cartDao.addProductToCart(customerId, productId)
            return success(cartDocumentToCartItem(cartDocument))
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);    
        }
    }

    async getCartItems(customerId: string): Promise<Result<Product[]>> {
        try {
            const productItems = await this.cartDao.getCartItems(customerId);
            const products = productItems.map((productItem) => productDocumentToProduct(productItem));
            return success(products);
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500); 
        }
    }
    
}