import { CartDocument } from "@src/data/entity/Cart";
import { CartItem } from "@src/domain/model/CartItem";

export const cartDocumentToCartItem = (cartDocument: CartDocument): CartItem => {
    return {
        _id: cartDocument._id.toString(),
        customerId: cartDocument.customerId,
        productId: cartDocument.productId
    }
}