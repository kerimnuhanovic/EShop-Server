import { Conversation } from "@src/domain/model/Conversation";
import { ChatRepository } from "@src/domain/repository/ChatRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class GetUserConversationsUsecase {
    @inject(TYPES.ChatRepository) private chatRepository!: ChatRepository
    invoke(user: string): Promise<Result<Conversation[]>> {
        return this.chatRepository.getUserConversations(user);
    }
}