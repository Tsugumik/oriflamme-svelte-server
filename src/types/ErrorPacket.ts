import { ServerError } from "../errorHandler/ServerError"

export type ErrorPacket = {
    id: ServerError,
    msg: string
}