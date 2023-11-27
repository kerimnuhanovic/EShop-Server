import { User } from '@src/domain/model/User';
import mongoose, { Document, Model, mongo } from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surename: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
    default: 'imageurl',
  },
  userType: {
    type: String,
    required: true,
  },
  shopCategories: {
    type: [String],
    required: false,
  },
});

export class UserDocument extends Document {
  _id: mongoose.ObjectId;
  name: string;
  surename: string;
  username: string;
  email: string;
  password: string;
  profileImage: string;
  userType: string;
  shopCategories: string[];
  constructor(
    _id: mongoose.ObjectId,
    name: string,
    surename: string,
    username: string,
    email: string,
    password: string,
    profileImage: string,
    userType: string,
    shopCategories: string[]
  ) {
    super();
    this._id = _id;
    this.name = name;
    this.surename = surename;
    this.username = username;
    this.email = email;
    this.password = password;
    this.profileImage = profileImage;
    this.userType = userType;
    this.shopCategories = shopCategories;
  }
}

export const UserEntity: Model<UserDocument> = mongoose.model<UserDocument>('UserEntity', UserSchema);
