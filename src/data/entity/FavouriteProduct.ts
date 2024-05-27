import mongoose, { Document, Model } from 'mongoose';

const FavouriteProductSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export class FavouriteProductDocument extends Document {
  _id: mongoose.ObjectId;
  userId: string;
  productId: string;
  dateCreated: mongoose.Date;
  constructor(
    _id: mongoose.ObjectId,
    userId: string,
    productId: string,
    dateCreated: mongoose.Date
  ) {
    super();
    this._id = _id;
    this.userId = userId;
    this.productId = productId;
    this.dateCreated = dateCreated;
  }
}

export const FavouriteProductEntity: Model<FavouriteProductDocument> = mongoose.model<FavouriteProductDocument>('FavouriteProduct', FavouriteProductSchema);
