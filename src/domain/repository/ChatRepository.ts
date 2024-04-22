import { Conversation } from "@src/domain/model/Conversation";
import { Result } from "@src/domain/util/Result";

export interface ChatRepository {
    getUserConversations(user: string): Promise<Result<Conversation[]>>
}