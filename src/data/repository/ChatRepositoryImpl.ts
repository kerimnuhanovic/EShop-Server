import { MessageDao } from "@src/data/dao/MessageDao";
import { ChatRepository } from "@src/domain/repository/ChatRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "types";
import { Result, failure, success } from "@src/domain/util/Result";
import { handleMongoError } from '../util/errorHandlingUtil';
import { MongoError } from 'mongodb';
import { notFound, serverError } from '@src/strings/strings';
import { messagesToConversationMapper } from "@src/data/mapper/ConversationMapper";
import { Conversation } from "@src/domain/model/Conversation";
import { UserDao } from "@src/data/dao/UserDao";

@injectable()
export class ChatRepositoryImpl implements ChatRepository {
    @inject(TYPES.MessageDao) private messageDao!: MessageDao
    @inject(TYPES.UserDao) private userDao!: UserDao
    async getUserConversations(user: string): Promise<Result<Conversation[]>> {
        try {
            const messages = await this.messageDao.getUserConversations(user);

            const chatParners = [...new Set(messages.map(message => message.sentBy === user ? message.receivedBy : message.sentBy))];

            const chatParnersInfo = await this.userDao.getUsersInformation(chatParners);

            return success(messagesToConversationMapper(messages, user, chatParnersInfo));
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }

    async updateUserConversation(user: string, chatParner: string): Promise<Result<Conversation>> {
        try {
            const messages = await this.messageDao.updateUserConversation(user, chatParner);

            const chatPartnerInfo = await this.userDao.getUsersInformation([chatParner]);

            return success(messagesToConversationMapper(messages, user, chatPartnerInfo)[0])
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }

}