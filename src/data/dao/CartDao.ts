import { CartDocument, CartEntity } from "@src/data/entity/Cart";
import { ProductDocument, ProductEntity } from "@src/data/entity/Product";
import { injectable } from "inversify";

export interface CartDao {
    addProductToCart(customerId: string, productId: string): Promise<CartDocument>;
    getCartItems(customerId: string): Promise<ProductDocument[]>;
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

    async getCartItems(customerId: string): Promise<ProductDocument[]> {
        const cartItems = await CartEntity.find({
            customerId: customerId
        })
        const productsIds = cartItems.map((item) => item.productId)
        const products = await ProductEntity.find({
            _id: {$in: productsIds}
        })
        return products;
    }
}