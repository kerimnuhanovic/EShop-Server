export interface MessageResponse {
    sentBy: string,
    receivedBy: string,
    payload: string,
    dateCreated: Date,
    isSeen: boolean,
    isCurrentUserReceiver: boolean
}