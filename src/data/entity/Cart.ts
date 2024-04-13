import mongoose, { Document, Model } from 'mongoose';

const CartSchema = new mongoose.Schema({
    customerId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    }
  });

  export class CartDocument extends Document {
    _id: mongoose.ObjectId;
    customerId: string;
    productId: string
    constructor(
        _id: mongoose.ObjectId,
        customerId: string,
        productId: string    
    ) {
        super()
        this._id = _id
        this.customerId = customerId
        this.productId = productId
    }
  }

export const CartEntity: Model<CartDocument> = mongoose.model<CartDocument>('Cart', CartSchema);