import { ServerError } from "./ServerError";

export const ErrorMessages: { [id in ServerError]: string} = {
    [ServerError.WRONG_USERNAME]: "Username is not releated to the id",
    [ServerError.WRONG_ID]: "Provided player id does not exist in memory",
    [ServerError.EMPTY_ID]: "The client did not provide a player id",
    [ServerError.TOO_LONG_CHAT_MESSAGE]: "Socket tried to send a message longer than allowed",
    [ServerError.CLIENT_CONNECTION_ERROR]: "Client connection error",
    [ServerError.PLAYER_ALREADY_CONNECTED]: "Player with given details is already connected",
    [ServerError.ADMIN_KEY_ENV_NOT_EXIST]: "Admin key does not exist in the environment file",
    [ServerError.WRONG_ADMIN_KEY]: "Incorrect admin key",
    [ServerError.PLAYER_LIMIT_REACHED]: "The maximum number of players in the lobby has been reached",
    [ServerError.REQUEST_PARSE_ERROR]: "Request parse error",
    [ServerError.GAME_ALREADY_STARTED]: "Game alredy started"
}