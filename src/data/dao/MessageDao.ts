import { MessageDocument, MessageEntity } from "@src/data/entity/Message";
import { injectable } from "inversify";

export interface MessageDao {
    addMessage(
        sentBy: string,
        receivedBy: string,
        payload: string
    ): Promise<MessageDocument>;
    getUserConversations(
        user: string
    ): Promise<MessageDocument[]>;
}

@injectable()
export class MessageDaoImpl implements MessageDao {
    async addMessage(sentBy: string, receivedBy: string, payload: string): Promise<MessageDocument> {
        const newMessage = new MessageEntity({
            sentBy: sentBy,
            receivedBy: receivedBy,
            payload: payload
        })
        return await newMessage.save()
    }

    async getUserConversations(
        user: string
    ): Promise<MessageDocument[]> {
        const messages = await MessageEntity.find({
            $or: [{sentBy: user}, {receivedBy: user}]
        }).sort([["dateCreated", 1]])

        return messages;
    }
}