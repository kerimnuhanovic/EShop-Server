import { DetailedOrder } from "@src/domain/model/DetailedOrder";
import { Order } from "@src/domain/model/Order";
import { OrderRepository } from "@src/domain/repository/OrderRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class ListCustomerOrdersUsecase {
    @inject(TYPES.OrderRepository) private orderRepository!: OrderRepository
    invoke(customer: string): Promise<Result<DetailedOrder[]>> {
        return this.orderRepository.listCustomerOrders(customer);
    }
}