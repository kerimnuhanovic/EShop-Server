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

@injectable()
export class ChatRepositoryImpl implements ChatRepository {
    @inject(TYPES.MessageDao) private messageDao!: MessageDao
    async getUserConversations(user: string): Promise<Result<Conversation[]>> {
        try {
            const messages = await this.messageDao.getUserConversations(user)
            return success(messagesToConversationMapper(messages, user));
        } catch (error) {
            if (error instanceof MongoError) {
                return handleMongoError(error);
            }
            return failure(serverError, 500);
        }
    }
}