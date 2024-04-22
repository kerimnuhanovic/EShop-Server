import { MessageResponse } from "@src/domain/model/MessageResponse";

export interface Conversation {
    chatPartner: string,
    messages: MessageResponse[]
}