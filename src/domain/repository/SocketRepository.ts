import { Server } from "http";

export interface SocketRepository {
    initializeWebSocket(server: Server): void;
}