import mongoose, { Document, Model } from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  authorProfileImage: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

export class ReviewDocument extends Document {
  _id: mongoose.ObjectId;
  authorId: string;
  authorProfileImage: string;
  comment: string;
  rating: number;
  shopId: string;
  dateAdded: mongoose.Date
    constructor(
    _id: mongoose.ObjectId,
    authorId: string,
    authorProfileImage: string,
    comment: string,
    rating: number,
    shopId: string,
    dateAdded: mongoose.Date
  ) {
    super();
    this._id = _id;
    this.authorId = authorId;
    this.authorProfileImage = authorProfileImage;
    this.comment = comment;
    this.rating = rating;
    this.shopId = shopId;
    this.dateAdded = dateAdded
  }
}

export const ReviewEntity: Model<ReviewDocument> = mongoose.model<ReviewDocument>('Review', ReviewSchema);
