import { Socket } from 'socket.io';
import emitChatHistory from './emitChatHistory';
import { SOCKET_ON } from "../utils/SOCKET_ON";
import { MessagePacket } from '../types/MessagePacket';

export default async function createListenerSyncChat(socket: Socket, chatHistory: Array<MessagePacket>) {
    socket.on(SOCKET_ON.CHAT_SYNC, async () => {
        console.log(`Socket ${socket.id} successfully synced chat history!`);
        await emitChatHistory(socket, chatHistory);
        return;
    });
}
