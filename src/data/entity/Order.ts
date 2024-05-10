import mongoose, { Document, Model } from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    shop: {
      type: String,
      required: true
    },
    items: {
        type: [String],
        required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined'],
      default: 'pending'
    }
  });

const OrderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    orderDetails: [OrderItemSchema],
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now,
      }
})

export class OrderDocument extends Document {
    _id: mongoose.ObjectId;
    customer: string;
    orderDetails: {
        shop: string;
        items: string[];
        status: string
    }[];
    dateCreated: mongoose.Date;
    constructor(
      _id: mongoose.ObjectId,
      customer: string,
      orderDetails: {
        shop: string;
        items: string[];
        status: string
      }[],
      dateCreated: mongoose.Date
    ) {
      super();
      this._id = _id;
      this.customer = customer;
      this.orderDetails = orderDetails
      this.dateCreated = dateCreated
    }
  }
  
  export const OrderEntity: Model<OrderDocument> = mongoose.model<OrderDocument>('Order', OrderSchema);