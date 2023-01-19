import { Socket } from 'socket.io';
import { CreatePlayerClientResponseObject } from '../types/CreatePlayerClientResponseObject';
import { ErrorPacket } from '../types/ErrorPacket';
import { ErrorMessages } from './ErrorMessages';
import { ServerError } from './ServerError';

export default async function emitError(socket: Socket, error: ServerError) {
    let error_message = "";

    if(ErrorMessages[error]) {
        error_message = ErrorMessages[error];
    } else {
        error_message = `There is no message for this error code`;
    }


    const ERROR_PACKET: ErrorPacket = { id: error, msg: error_message };

    console.error(`Error: ${JSON.stringify(ERROR_PACKET)} emited to socket: ${socket.id}`);

    socket.emit("error", JSON.stringify(ERROR_PACKET));
}
