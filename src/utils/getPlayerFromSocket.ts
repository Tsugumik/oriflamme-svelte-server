import { Socket } from 'socket.io';
import Player from '../entities/Player';


export async function getPlayerFromSocket(socket: Socket, playersArray: Array<Player>): Promise<Player> {    
    const result = playersArray.filter(player => {
        return player.lastSocketId == socket.id;
    });

    return result[0];
}
