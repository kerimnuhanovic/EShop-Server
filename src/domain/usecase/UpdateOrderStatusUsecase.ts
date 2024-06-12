import { inject, injectable } from "inversify";
import { OrderRepository } from "../repository/OrderRepository";
import { Result } from "../util/Result";
import { TYPES } from "types";

@injectable()
export class UpdateOrderStatusUsecase {
    @inject(TYPES.OrderRepository) private orderRepository!: OrderRepository
    invoke(id: string, orderDetailsId: string, newStatus: string): Promise<Result<number>> {
        return this.orderRepository.updateOrderStatus(id, orderDetailsId, newStatus);
    }
}