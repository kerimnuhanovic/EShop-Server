import mongoose, { Document, Model } from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  images: {
    type: [String],
    required: true,
  },
});

export class ProductDocument extends Document {
  _id: mongoose.ObjectId;
  title: string;
  description: string;
  category: string;
  price: number;
  shop: string;
  date: mongoose.Date;
  images: string[];
  constructor(
    _id: mongoose.ObjectId,
    title: string,
    description: string,
    category: string,
    price: number,
    shop: string,
    date: mongoose.Date,
    images: string[]
  ) {
    super();
    this._id = _id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.shop = shop;
    this.date = date;
    this.images = images;
  }
}

export const ProductEntity: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', ProductSchema);
