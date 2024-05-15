import { OrderDocument } from "@src/data/entity/Order";
import { Order } from "@src/domain/model/Order";

export const orderDocumentToOrder = (orderDocument: OrderDocument): Order => {
    return {
        id: orderDocument._id.toString(),
        customer: orderDocument.customer,
        orderDetails: orderDocument.orderDetails.map((orderDetails) => ({
            shop: orderDetails.shop,
            items: orderDetails.items,
            status: orderDetails.status,
            id: orderDetails._id

        })),
        dateCreated: new Date(orderDocument.dateCreated.toString())
    }
}