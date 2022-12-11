import { Socket } from 'socket.io';
import { CreatePlayerClientResponseObject } from '../types/CreatePlayerClientResponseObject';
import { ErrorPacket } from '../types/ErrorPacket';
import { ServerError } from './ServerError';

export default async function emitError(socket: Socket, error: ServerError, PLAYER_CREATE_OBJECT?: CreatePlayerClientResponseObject) {
    let error_message = "";

    if (error == ServerError.WRONG_USERNAME) {
        error_message = `Socket ${socket.id} username ${PLAYER_CREATE_OBJECT?.name} is not releated to the id ${PLAYER_CREATE_OBJECT?.id}`;
    } else if (error == ServerError.EMPTY_ID) {
        error_message = `The client did not provide a player id`;
    } else if (error == ServerError.PLAYER_ALREADY_CONNECTED) {
        error_message = `Player with given details is already connected`
    } else if (error == ServerError.WRONG_ID) {
        error_message = `Provided player id does not exist in memory`
    } else if (error == ServerError.TOO_LONG_CHAT_MESSAGE) {
        error_message = `Socket tried to send a message longer than allowed`
    } else {
        error_message = `There is no message for this error code`;
    }


    const ERROR_PACKET: ErrorPacket = { id: error, msg: error_message };

    console.error(`Error: ${JSON.stringify(ERROR_PACKET)} emited to socket: ${socket.id}`);

    socket.emit("error", JSON.stringify(ERROR_PACKET));
}
