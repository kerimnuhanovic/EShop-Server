import { CartItem } from "@src/domain/model/CartItem";
import { CartRepository } from "@src/domain/repository/CartRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class GetCartItemsUsecase {
    @inject(TYPES.CartRepository) private cartRepository!: CartRepository
    invoke(customerId: string): Promise<Result<CartItem[]>> {
        return this.cartRepository.getCartItems(customerId);
    }
}