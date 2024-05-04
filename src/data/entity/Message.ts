import mongoose, { Document, Model } from 'mongoose';

const MessageSchema = new mongoose.Schema({
    sentBy: {
        type: String,
        required: true,
    },
    receivedBy: {
        type: String,
        required: true,
    },
    payload: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    isSeen: {
        type: Boolean,
        required: true,
        default: false
    }
})

export class MessageDocument extends Document {
    _id: mongoose.ObjectId;
    sentBy: string;
    receivedBy: string;
    payload: string;
    dateCreated: mongoose.Date;
    isSeen: boolean;
    constructor(
        _id: mongoose.ObjectId,
        sentBy: string,
        receivedBy: string,
        payload: string,
        dateCreated: mongoose.Date,
        isSeen: boolean
    ) {
        super();
        this._id = _id;
        this.sentBy = sentBy;
        this.receivedBy = receivedBy;
        this.payload = payload;
        this.dateCreated = dateCreated;
        this.isSeen = isSeen;
    }
}

export const MessageEntity: Model<MessageDocument> = mongoose.model<MessageDocument>('Message', MessageSchema);