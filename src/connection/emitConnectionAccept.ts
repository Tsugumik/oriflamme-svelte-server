import { Socket } from 'socket.io';
import Player from '../entities/Player';
import { SOCKET_EMITERS } from '../utils/SOCKET_EMITERS';


export default async function emitConnectionAccept(socket: Socket, player: Player) {
    socket.emit(SOCKET_EMITERS.CONNECTION_ACCEPT, JSON.stringify({playerId: player.id, connectionId: player.connectionId}));
    return;
}
