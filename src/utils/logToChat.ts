import { Server } from "socket.io";
import GameInstance from "../game/GameInstance";
import { MessagePacket } from "../types/MessagePacket";
import { SocketEmiters } from "./SocketEmiters";

export default async function logToChat(gameInstance: GameInstance, io: Server, message: string, error?: boolean) {
    const DATE = new Date();
    const TIME = `${DATE.getHours()}:${DATE.getMinutes()}:${DATE.getSeconds()}`;
    let msg_packet: MessagePacket;
    if(error) {
        msg_packet = { sender: "Server", senderid: "Server_error", message: message, time: TIME };
    } else {
        msg_packet = { sender: "Server", senderid: "Server", message: message, time: TIME };
    }
    
    gameInstance.chat.push(msg_packet);
    io.local.emit(SocketEmiters.CHAT_SYNC);
    io.local.emit(SocketEmiters.SERVER_SOUND);
}