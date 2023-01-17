import { ApiErrors } from "./apiErrors";

export const ApiErrorMessages: { [id in ApiErrors]: string } = {
    [ApiErrors.INVALID_API_KEY]: "Invalid API key",
    [ApiErrors.INVALID_SOCKET_ID]: "Invalid Socket id",
    [ApiErrors.VALIDATION_ERROR]: "Validation error",
    [ApiErrors.INVALID_ADMIN_KEY]: "Invalid admin key",
    [ApiErrors.PERMISSION_LEVEL_TOO_LOW]: "Permission level too low",
    [ApiErrors.INCORRECT_NUMBER_OF_PLAYERS]: "Incorrect number of players",
    [ApiErrors.NOTACTIVEPLAYER]: "You are not an an active player"
}