import { OrderDocument, OrderEntity } from "@src/data/entity/Order";
import { OrderDetails } from "@src/domain/model/Order";
import { injectable } from "inversify";

export interface OrderDao {
    addOrder(customer: string, orderDetails: OrderDetails[]): Promise<OrderDocument>;
    listCustomerOrders(customer: string): Promise<OrderDocument[]>;
    listShopOrders(shop: string): Promise<OrderDocument[]>;
    updateOrderStatus(id: string, orderDetailsId: string, newStatus: string): Promise<number>;
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

    async listShopOrders(shop: string): Promise<OrderDocument[]> {
        const orders = await OrderEntity.find({
            orderDetails: {
                $elemMatch: {shop: shop}
            }
        }).sort([['dateCreated', -1]])

        return orders
    }

    async updateOrderStatus(id: string, orderDetailsId: string, newStatus: string): Promise<number> {
        const result = await OrderEntity.updateOne(
            { _id: id, 'orderDetails._id': orderDetailsId },
            { $set: { 'orderDetails.$.status': newStatus } }
        );
        return result.modifiedCount
    }
}