import { CartDocument, CartEntity } from "@src/data/entity/Cart";
import { injectable } from "inversify";

export interface CartDao {
    addProductToCart(customerId: string, productId: string): Promise<CartDocument>;
    getCartItems(customerId: string): Promise<CartDocument[]>;
}

@injectable()
export class CartDaoImpl implements CartDao {
    async addProductToCart(customerId: string, productId: string): Promise<CartDocument> {
        const cartDocument = new CartEntity({
            customerId: customerId,
            productId: productId
        })
        return await cartDocument.save()
    }

    async getCartItems(customerId: string): Promise<CartDocument[]> {
        const cartItems = await CartEntity.find({
            customerId: customerId
        })
        return cartItems;
    }
}