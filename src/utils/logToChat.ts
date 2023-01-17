import { Server } from "socket.io";
import GameInstance from "../game/GameInstance";
import { MessagePacket } from "../types/MessagePacket";
import { SocketEmiters } from "./SocketEmiters";

export default async function logToChat(gameInstance: GameInstance, io: Server, message: string) {
    const DATE = new Date();
    const TIME = `${DATE.getHours()}:${DATE.getMinutes()}:${DATE.getSeconds()}`;
    const MSG_PACKET: MessagePacket = { sender: "Server", senderid: "Server", message: message, time: TIME };
    gameInstance.chat.push(MSG_PACKET);
    io.local.emit(SocketEmiters.CHAT_SYNC);
    io.local.emit(SocketEmiters.SERVER_SOUND);
}