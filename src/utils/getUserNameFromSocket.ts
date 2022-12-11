import { Socket } from 'socket.io';
import Player from '../entities/Player';
import { PlayersObject } from '../types/PlayersObject';


export async function getUserNameFromSocket(socket: Socket, playersArray: Array<Player>): Promise<string> {    
    const result = playersArray.filter(player => {
        return player.lastSocketId == socket.id;
    });

    const username = result[0].name;

    return username;
}
