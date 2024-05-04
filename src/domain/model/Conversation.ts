import { MessageResponse } from "@src/domain/model/MessageResponse";

export interface Conversation {
    chatPartner: string,
    chatPartnerProfileImage: string;
    messages: MessageResponse[]
}