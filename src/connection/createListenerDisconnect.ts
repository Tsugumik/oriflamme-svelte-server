import { Server, Socket } from 'socket.io';
import Player from '../entities/Player';
import GameInstance from '../game/GameInstance';
import { GameState } from '../game/GameState';
import { SocketEmiters } from '../utils/SocketEmiters';
import { SOCKET_ON } from '../utils/SOCKET_ON';

export default async function createListenerDisconnect(socket: Socket, playersArray: Array<Player>, gameInstace: GameInstance, globalIoServer: Server) {
    socket.on(SOCKET_ON.DISCONNECT, async () => {
        const result = playersArray.filter(player => {
            return player.lastSocketId == socket.id;
        });

        if(result.length < 1) {
            console.log(`${socket.id} disconnected!`);
            return;
        }

        if(gameInstace.gameState == GameState.LOBBY) {
            result.forEach(async player => {
                const index = playersArray.indexOf(player);
                playersArray.splice(index, 1);
            });
            console.log(`${socket.id} disconnected from the lobby!`);
        } else if(gameInstace.gameState == GameState.PLAYING) {
            result.forEach(async player => {
                player.connectionStatus = false;
            });
            console.log(`${socket.id} disconnected from the game!`);
        }
        
        globalIoServer.local.emit(SocketEmiters.LOBBY_SYNC);

    });

    
}
