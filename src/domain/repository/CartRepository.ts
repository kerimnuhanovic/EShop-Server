import { CartItem } from "@src/domain/model/CartItem";
import { Product } from "@src/domain/model/Product";
import { Result } from "@src/domain/util/Result";

export interface CartRepository {
    addCartItem(customerId: string, productId: string): Promise<Result<CartItem>>;
    getCartItems(customerId: string): Promise<Result<Product[]>>;
}