import { Socket } from 'socket.io';
import Player from '../entities/Player';


export default async function getPlayerFromSocketId(socketId: string | undefined, playersArray: Array<Player>): Promise<Player> {    
    const result = playersArray.filter(player => {
        return player.lastSocketId == socketId;
    });

    return result[0];
}
