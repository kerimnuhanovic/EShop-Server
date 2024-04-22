import { SocketRepository } from "@src/domain/repository/SocketRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "types";
import { Server } from "http";

@injectable()
export class InitializeWebSocketUsecase {
    @inject(TYPES.SocketRepository) private socketRepository!: SocketRepository;
    invoke(server: Server): void {
        return this.socketRepository.initializeWebSocket(server);
    }
}