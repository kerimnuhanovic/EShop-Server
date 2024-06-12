import { DetailedOrder } from "@src/domain/model/DetailedOrder";
import { Order, OrderDetails } from "@src/domain/model/Order";
import { Result } from "@src/domain/util/Result";

export interface OrderRepository {
    addOrder(customer: string, orderDetails: OrderDetails[]): Promise<Result<Order>>;
    listCustomerOrders(customer: string): Promise<Result<DetailedOrder[]>>;
    listShopOrders(shop: string): Promise<Result<DetailedOrder[]>>;
    updateOrderStatus(id: string, orderDetailsId: string, newStatus: string): Promise<Result<number>>;
}