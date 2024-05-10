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

@injectable()
export class OrderRepositoryImpl implements OrderRepository {
    @inject(TYPES.OrderDao) private orderDao!: OrderDao
    @inject(TYPES.CartDao) private cartDao!: CartDao
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
    
}