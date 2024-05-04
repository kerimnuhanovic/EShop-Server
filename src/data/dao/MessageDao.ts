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
    updateUserConversation(
        user: string,
        chatPartner: string
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

    async updateUserConversation(user: string, chatPartner: string): Promise<MessageDocument[]> {
        const updateFilter = {
            $or: [{$and: [{sentBy: user}, {receivedBy: chatPartner}, {isSeen: false}]}, {$and: [{sentBy: chatPartner}, {receivedBy: user}, {isSeen: false}]}]
        }
        const retrieveFilter = {
            $or: [{$and: [{sentBy: user}, {receivedBy: chatPartner}]}, {$and: [{sentBy: chatPartner}, {receivedBy: user}]}]
        }
        const update = {
            isSeen: true
        }

        const updateResult = await MessageEntity.updateMany(updateFilter, update)

        const messages = await MessageEntity.find(retrieveFilter).sort([["dateCreated", 1]])

        return messages;
    }
}