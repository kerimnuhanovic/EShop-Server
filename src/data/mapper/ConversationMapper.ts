import { MessageDocument } from "@src/data/entity/Message";
import { UserDocument } from "@src/data/entity/User";
import { messageDocumentToMessageResponse } from "@src/data/mapper/MessageResponseMapper";
import { Conversation } from "@src/domain/model/Conversation";
import { MessageResponse } from "@src/domain/model/MessageResponse";

export const messagesToConversationMapper = (messages: MessageDocument[], user: string, chatParnersInfo: UserDocument[]): Conversation[] => {
    const conversations = new Map<string, MessageResponse[]>()
    messages.map((message: MessageDocument) => {
        const isUserReceiver = message.receivedBy === user;
        const chatPartner = isUserReceiver ? message.sentBy : message.receivedBy
        if (!conversations.get(chatPartner)) {
            conversations.set(chatPartner, [messageDocumentToMessageResponse(message, isUserReceiver)])
        } else {
            conversations.get(chatPartner)!.push(messageDocumentToMessageResponse(message, isUserReceiver));
        }
    })
    const result: Conversation[] = []
    const keys = conversations.keys()
    
    while (true) {
        const key = keys.next().value
        if (!key) {
            break;
        }
        result.push({
            chatPartner: key,
            chatPartnerProfileImage: chatParnersInfo.find((chatPartner) => chatPartner.username === key)!.profileImage,
            messages: conversations.get(key)!
        })
    }

    return result;
}