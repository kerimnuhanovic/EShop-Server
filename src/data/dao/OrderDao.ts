import { OrderDocument, OrderEntity } from "@src/data/entity/Order";
import { OrderDetails } from "@src/domain/model/Order";
import { injectable } from "inversify";

export interface OrderDao {
    addOrder(customer: string, orderDetails: OrderDetails[]): Promise<OrderDocument>;
    listCustomerOrders(customer: string): Promise<OrderDocument[]>;
}

@injectable()
export class OrderDaoImpl implements OrderDao {
    async addOrder(customer: string, orderDetails: OrderDetails[]): Promise<OrderDocument> {
        const order = new OrderEntity({
            customer: customer,
            orderDetails: orderDetails
        })
        return await order.save()
    } 
    
    async listCustomerOrders(customer: string): Promise<OrderDocument[]> {
        const orders = await OrderEntity.find({
            customer: customer
        }).sort([['dateCreated', -1]])

        return orders
    }
}