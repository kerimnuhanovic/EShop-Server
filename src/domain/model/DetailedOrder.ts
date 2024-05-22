import { Product } from "@src/domain/model/Product";

export interface OrderInfo {
    shop: string;
    items: Product[];
    status: string;
    id?: string
}

export interface DetailedOrder {
    id: string
    customer: string,
    orderDetails: OrderInfo[],
    dateCreated: Date
}