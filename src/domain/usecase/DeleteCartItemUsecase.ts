import { CartRepository } from "@src/domain/repository/CartRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class DeleteCartItemUsecase {
    @inject(TYPES.CartRepository) private cartRepository!: CartRepository
    invoke(customerId: string, productId: string): Promise<Result<number>> {
        return this.cartRepository.deleteItem(customerId, productId);
    }
}