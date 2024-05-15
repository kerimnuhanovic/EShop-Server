import { OrderDao } from "@src/data/dao/OrderDao";
import { orderDocumentToOrder } from "@src/data/mapper/OrderMapper";
import { OrderDetails, Order } from "@src/domain/model/Order";
import { OrderRepository } from "@src/domain/repository/OrderRepository";
import { Result, failure, success } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";
import { handleMongoError } from '../util/errorHandlingUtil';
import { MongoError } from 'mongodb';
import { serverError } from '@src/strings/strings';
import { CartDao } from "@src/data/dao/CartDao";
import { ProductDao } from "@src/data/dao/ProductDao";
import { DetailedOrder } from "@src/domain/model/DetailedOrder";
import { productDocumentToProduct } from "@src/data/mapper/ProductMapper";

@injectable()
export class OrderRepositoryImpl implements OrderRepository {
    @inject(TYPES.OrderDao) private orderDao!: OrderDao
    @inject(TYPES.CartDao) private cartDao!: CartDao
    @inject(TYPES.ProductDao) private productDao!: ProductDao
    async addOrder(customer: string, orderDetails: OrderDetails[]): Promise<Result<Order>> {
        try {
            const orderDocument = await this.orderDao.addOrder(customer, orderDetails);
            const numberOfOrderItems = await this.cartDao.deleteAllCartItems(customer);
            
            return success(orderDocumentToOrder(orderDocument));
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
              }
            return failure(serverError, 500);
        }
    }

    async listCustomerOrders(customer: string): Promise<Result<DetailedOrder[]>> {
        try {
            const orderDocuments = await this.orderDao.listCustomerOrders(customer);
            const orders = orderDocuments.map((orderDocument) => orderDocumentToOrder(orderDocument));
            const detailedOrders: DetailedOrder[] = []
            
            await Promise.all(orders.map(async (order) => {
                const detailedOrder: DetailedOrder = {
                    id: order.id,
                    customer: order.customer,
                    orderDetails: [],
                    dateCreated: order.dateCreated
                };

                await Promise.all(order.orderDetails.map(async (orderDetails) => {
                    const productDocuments = await this.productDao.listProducts(orderDetails.items);
                    const products = productDocuments.map((productDocument) => productDocumentToProduct(productDocument));
                    detailedOrder.orderDetails.push({
                        shop: orderDetails.shop,
                        items: products,
                        status: orderDetails.status,
                        id: orderDetails.id
                    });
                }));

                detailedOrders.push(detailedOrder);
            }));

            return success(detailedOrders);
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
              }
            return failure(serverError, 500);
        }
    }
    
}