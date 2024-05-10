import { Order, OrderDetails } from "@src/domain/model/Order";
import { Result } from "@src/domain/util/Result";

export interface OrderRepository {
    addOrder(customer: string, orderDetails: OrderDetails[]): Promise<Result<Order>>;
}