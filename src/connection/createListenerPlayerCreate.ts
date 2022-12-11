import { Socket } from 'socket.io';
import crypto from 'crypto';
import { CreatePlayerClientResponseObject } from '../types/CreatePlayerClientResponseObject';
import { ServerError } from '../errorHandler/ServerError';
import emitError from '../errorHandler/emitError';
import Player from '../entities/Player';
import { SOCKET_ON } from '../utils/SOCKET_ON';
import emitConnectionAccept from "./emitConnectionAccept";
import { PlayersObject } from '../types/PlayersObject';
import getPlayerFromId from '../utils/getPlayerFromId';
import playerExist from '../utils/playerExist';
import GameInstance from '../game/GameInstance';

export default async function createListenerPlayerCreate(socket: Socket, playersArray: Array<Player>, gameInstace: GameInstance) {
    socket.on(SOCKET_ON.PLAYER_CREATE, async message => {
        if(gameInstace.players.length == gameInstace.MAX_PLAYERS) {
            emitError(socket, ServerError.PLAYER_LIMIT_REACHED);
            return;
        }
        const PLAYER_CREATE_OBJECT: CreatePlayerClientResponseObject = JSON.parse(message);
        if (PLAYER_CREATE_OBJECT.id == "") {
            const GENERATED_PLAYER_ID = crypto.randomUUID();
            playersArray.push(new Player(GENERATED_PLAYER_ID, PLAYER_CREATE_OBJECT.name, socket.id));
            const PLAYER = await getPlayerFromId(playersArray, GENERATED_PLAYER_ID); 
            PLAYER.connectionStatus = true;
            console.log(`Generated new Player object ${GENERATED_PLAYER_ID} for socket ${socket.id}`);
            await emitConnectionAccept(socket, PLAYER);
            return;
        } else if (PLAYER_CREATE_OBJECT.id) {
            console.log(`${PLAYER_CREATE_OBJECT.id} trying to reconnect from socket ${socket.id}...`);
            const PLAYER = await getPlayerFromId(playersArray, PLAYER_CREATE_OBJECT.id);
            if (PLAYER) {
                if(PLAYER.connectionStatus) {
                    await emitError(socket, ServerError.PLAYER_ALREADY_CONNECTED);
                }
                if (PLAYER.name == PLAYER_CREATE_OBJECT.name) {
                    PLAYER.lastSocketId = socket.id;
                    PLAYER.connectionStatus = true;
                    await emitConnectionAccept(socket, PLAYER);
                    console.log(`${PLAYER_CREATE_OBJECT.id} name: ${PLAYER.name} successfully reconnected, socket.id updated!`);
                    return;
                } else {
                    await emitError(socket, ServerError.WRONG_USERNAME, PLAYER_CREATE_OBJECT);
                    return;
                }
            } else {
                await emitError(socket, ServerError.WRONG_ID);
                return;
            }
        } else {
            await emitError(socket, ServerError.EMPTY_ID);
        }
    });
}