export enum OrderStatus {
    PENDING = "pending",
    APPROVED = "approved",
    DECLINED = "declined"
}

export interface OrderDetails {
    shop: string;
    items: string[];
    status: string
}

export interface Order {
    id: string
    customer: string,
    orderDetails: OrderDetails[],
    dateCreated: Date
}