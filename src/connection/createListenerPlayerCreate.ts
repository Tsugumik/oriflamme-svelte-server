import { Server, Socket } from 'socket.io';
import crypto from 'crypto';
import { CreatePlayerClientResponseObject } from '../types/CreatePlayerClientResponseObject';
import { ServerError } from '../errorHandler/ServerError';
import emitError from '../errorHandler/emitError';
import Player from '../entities/Player';
import { SOCKET_ON } from '../utils/SOCKET_ON';
import emitConnectionAccept from "./emitConnectionAccept";
import GameInstance from '../game/GameInstance';
import { SocketEmiters } from '../utils/SocketEmiters';
import { PlayerColor } from '../types/PlayerColor';
import { GameState } from '../game/GameState';
import getPlayerFromConnectionId from '../utils/getPlayerFromConnectionId';

export default async function createListenerPlayerCreate(socket: Socket, playersArray: Array<Player>, gameInstace: GameInstance, globalIoServer: Server) {
    socket.on(SOCKET_ON.PLAYER_CREATE, async message => {
        if(gameInstace.players.length == gameInstace.MAX_PLAYERS) {
            await emitError(socket, ServerError.PLAYER_LIMIT_REACHED);
            globalIoServer.local.emit(SocketEmiters.LOBBY_SYNC);
            return;
        }

        const PLAYER_CREATE_OBJECT: CreatePlayerClientResponseObject = JSON.parse(message);
        
        if(!PLAYER_CREATE_OBJECT) {
            await emitError(socket, ServerError.CLIENT_CONNECTION_ERROR);
            return;
        }

        if (PLAYER_CREATE_OBJECT.id == "") {
            if(gameInstace.gameState == GameState.PLAYING) {
                await emitError(socket, ServerError.GAME_ALREADY_STARTED);
                return;
            }
            const GENERATED_PLAYER_ID = crypto.randomUUID();
            const GENERATED_CONNECTION_ID = crypto.randomUUID();
            const playerColor: PlayerColor = await gameInstace.getColor();
            playersArray.push(new Player(GENERATED_PLAYER_ID, PLAYER_CREATE_OBJECT.name, socket.id, playerColor, GENERATED_CONNECTION_ID));
            const PLAYER = await getPlayerFromConnectionId(playersArray, GENERATED_CONNECTION_ID); 
            PLAYER.connectionStatus = true;
            console.log(`Generated new Player object ${GENERATED_PLAYER_ID} for socket ${socket.id}`);
            await emitConnectionAccept(socket, PLAYER);
            globalIoServer.local.emit(SocketEmiters.LOBBY_SYNC);
            return;
        } else if (PLAYER_CREATE_OBJECT.id) {
            console.log(`${PLAYER_CREATE_OBJECT.id} trying to reconnect from socket ${socket.id}...`);
            const PLAYER = await getPlayerFromConnectionId(playersArray, PLAYER_CREATE_OBJECT.id);
            if (PLAYER) {
                if(PLAYER.connectionStatus) {
                    await emitError(socket, ServerError.PLAYER_ALREADY_CONNECTED);
                    globalIoServer.local.emit(SocketEmiters.LOBBY_SYNC);
                    return;
                }
                if (PLAYER.name == PLAYER_CREATE_OBJECT.name) {
                    PLAYER.lastSocketId = socket.id;
                    PLAYER.connectionStatus = true;
                    await emitConnectionAccept(socket, PLAYER);
                    globalIoServer.local.emit(SocketEmiters.LOBBY_SYNC);
                    console.log(`${PLAYER_CREATE_OBJECT.id} name: ${PLAYER.name} successfully reconnected, socket.id updated!`);
                    return;
                } else {
                    await emitError(socket, ServerError.WRONG_USERNAME);
                    globalIoServer.local.emit(SocketEmiters.LOBBY_SYNC);
                    return;
                }
            } else {
                await emitError(socket, ServerError.WRONG_ID);
                globalIoServer.local.emit(SocketEmiters.LOBBY_SYNC);
                return;
            }
        } else {
            await emitError(socket, ServerError.EMPTY_ID);
            globalIoServer.local.emit(SocketEmiters.LOBBY_SYNC);
            return;
        }
    });
}
