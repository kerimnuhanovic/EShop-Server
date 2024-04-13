import { CartDocument, CartEntity } from "@src/data/entity/Cart";
import { injectable } from "inversify";

export interface CartDao {
    addProductToCart(customerId: string, productId: string): Promise<CartDocument>
}

@injectable()
export class CartDaoImpl implements CartDao {
    async addProductToCart(customerId: string, productId: string): Promise<CartDocument> {
        try {
            const cartDocument = new CartEntity({
                customerId: customerId,
                productId: productId
            })
            return await cartDocument.save()
        } catch (e) {
            throw e
        }
    }
}