import { SocketRepository } from "@src/domain/repository/SocketRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import {Socket} from "socket.io"
import { Server } from "http";
import { SocketEvent } from "@src/data/util/SocketEvent";
import { container } from "inversify.config";
import { UserTokenValidationUsecase } from "@src/domain/usecase/UserTokenValidationUsecase";
import { TYPES } from "types";
import { Message } from "@src/domain/model/Message";
import { MessageDao } from "@src/data/dao/MessageDao";
import { messageDocumentToMessageResponse } from "@src/data/mapper/MessageResponseMapper";

@injectable()
export class SocketRepositoryImpl implements SocketRepository {
    @inject(TYPES.MessageDao) private messageDao!: MessageDao
    io?: Socket = undefined
    connectedUsers: Map<string, string> = new Map()
    initializeWebSocket(server: Server): void {
        this.io = require('socket.io')(server)
        if (!this.io) {
            return;
        }
        this.io.on('connection', (socket: Socket) => { 
            console.log(`User successfully connected ${socket.id}`)

            socket.on(SocketEvent.REGISTER_USER, (data: string) => {
                
                const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase)
                const tokenValidationResult = userTokenValidationUsecase.invoke(data);
                switch (tokenValidationResult.type) {
                    case 'success': {
                        
                        this.connectedUsers.set(tokenValidationResult.data.username, socket.id);
                        break;
                    }
                    case 'failure': {
                        console.log("User token is invalid!")
                        break;
                    }
                }
            })

            socket.on(SocketEvent.SEND_MESSAGE, async (data: string) => {
                const userTokenValidationUsecase = container.get<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase);
                const message = JSON.parse(data) as Message;
                const tokenValidationResult = userTokenValidationUsecase.invoke(message.sentBy);
                switch (tokenValidationResult.type) {
                    case 'success': {
                        const receiverSocket = this.connectedUsers.get(message.receivedBy);
                        const senderSocket = this.connectedUsers.get(tokenValidationResult.data.username);
                        try {
                            const result = await this.messageDao.addMessage(
                                tokenValidationResult.data.username,
                                message.receivedBy,
                                message.payload
                            )
                            
                            if (receiverSocket) {
                                socket.to(receiverSocket).emit(SocketEvent.RECEIVE_MESSAGE, messageDocumentToMessageResponse(result, true))
                            }
                            if (senderSocket) {
                                socket.emit(SocketEvent.RECEIVE_MESSAGE, messageDocumentToMessageResponse(result, false))
                            }
                        } catch {
                            // emit event that will indicate something went wrong
                            // on mobile app, create observable state that will be responsible to contain this error message        
                        }
                    }
                    case 'failure': {

                    }
                }
            })

         });
    }
    
}