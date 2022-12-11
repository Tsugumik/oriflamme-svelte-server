import { Server } from "socket.io";
import Player from "../entities/Player";
import emitPlayerSync from "./emitPlayerSync";

export default async function createListenerRequestPlayerSync(globalIoSocket: Server, playersArray: Array<Player>) {
    emitPlayerSync(globalIoSocket, playersArray);
}