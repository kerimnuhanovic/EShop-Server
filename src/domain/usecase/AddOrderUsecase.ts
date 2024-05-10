import { Order, OrderDetails } from "@src/domain/model/Order";
import { OrderRepository } from "@src/domain/repository/OrderRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class AddOrderUsecase {
    @inject(TYPES.OrderRepository) private orderRepository!: OrderRepository
    invoke(customer: string, orderDetails: OrderDetails[]): Promise<Result<Order>> {
        return this.orderRepository.addOrder(customer, orderDetails);
    }
}