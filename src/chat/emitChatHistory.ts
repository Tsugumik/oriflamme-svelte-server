import { Socket } from 'socket.io';
import { MessagePacket } from '../types/MessagePacket';
import { SOCKET_EMITERS } from "../utils/SOCKET_EMITERS";

export default async function emitChatHistory(socket: Socket, chatHistory: Array<MessagePacket>) {
    socket.emit(SOCKET_EMITERS.CHAT_SYNC_RESPONSE, JSON.stringify(chatHistory));
    return;
}
