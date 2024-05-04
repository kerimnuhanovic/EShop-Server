import { MessageDocument } from '@src/data/entity/Message';
import { MessageResponse } from '@src/domain/model/MessageResponse';
import { Product } from '@src/domain/model/Product';
import { ProductDocument } from 'src/data/entity/Product';

export const messageDocumentToMessageResponse = (messageDocument: MessageDocument, isCurrentUserReceiver: boolean): MessageResponse => {
  return {
    sentBy: messageDocument.sentBy,
    receivedBy: messageDocument.receivedBy,
    payload: messageDocument.payload,
    dateCreated: new Date(messageDocument.dateCreated.toString()),
    isSeen: messageDocument.isSeen,
    isCurrentUserReceiver: isCurrentUserReceiver
  }
}
