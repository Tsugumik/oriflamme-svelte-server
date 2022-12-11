import { Server, Socket } from 'socket.io';
import { ServerError } from '../errorHandler/ServerError';
import emitError from '../errorHandler/emitError';
import { MessagePacket } from '../types/MessagePacket';
import { SOCKET_EMITERS } from '../utils/SOCKET_EMITERS';
import { SOCKET_ON } from "../utils/SOCKET_ON";
import { getUserNameFromSocket } from "../utils/getUserNameFromSocket";
import Player from '../entities/Player';

export default async function createListenerNewChatMessage(socket: Socket, playersArray: Array<Player>, chatHistory: Array<MessagePacket>, globalIoServer: Server) {
    socket.on(SOCKET_ON.NEW_CHAT_MESSAGE, async message => {
        const username: string = await getUserNameFromSocket(socket, playersArray);
        const DATE = new Date();
        const TIME = `${DATE.getHours()}:${DATE.getMinutes()}:${DATE.getSeconds()}`;
        const MSG_PACKET: MessagePacket = { sender: username, message: message, time: TIME };
        if (MSG_PACKET.message.length > 100) {
            emitError(socket, ServerError.TOO_LONG_CHAT_MESSAGE);
            return;
        } else {
            chatHistory.push(MSG_PACKET);
            globalIoServer.local.emit(SOCKET_EMITERS.CHAT_MESSAGE, JSON.stringify(MSG_PACKET));
            return;
        }

    });
}
