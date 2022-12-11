import { Socket } from 'socket.io';
import Player from '../entities/Player';
import { GameState } from '../game/GameState';
import { SOCKET_ON } from '../utils/SOCKET_ON';

export default async function createListenerDisconnect(socket: Socket, playersArray: Array<Player>, gameState: GameState) {
    socket.on(SOCKET_ON.DISCONNECT, async () => {
        const result = playersArray.filter(async player => {
            return player.lastSocketId == socket.id;
        });

        if(gameState == GameState.LOBBY) {
            result.forEach(async player => {
                const index = playersArray.indexOf(player);
                playersArray.splice(index, 1);
                console.log(`${socket.id} disconnected from the lobby!`);
            }); 
        } else if(gameState == GameState.PLAYING) {
            result.forEach(async player => {
                player.connectionStatus = false;
                console.log(`${socket.id} disconnected from the game!`);
            });
        }        
    });
}
