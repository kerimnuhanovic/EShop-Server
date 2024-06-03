import mongoose, { Document, Model } from 'mongoose';

const FavouriteShopSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export class FavouriteShopDocument extends Document {
  _id: mongoose.ObjectId;
  userId: string;
  shopId: string;
  dateCreated: mongoose.Date;
  constructor(
    _id: mongoose.ObjectId,
    userId: string,
    shopId: string,
    dateCreated: mongoose.Date
  ) {
    super();
    this._id = _id;
    this.userId = userId;
    this.shopId = shopId;
    this.dateCreated = dateCreated;
  }
}

export const FavouriteShopEntity: Model<FavouriteShopDocument> = mongoose.model<FavouriteShopDocument>('FavouriteShop', FavouriteShopSchema);
