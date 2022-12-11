import { Socket } from "socket.io";
import Player from "../entities/Player";
import emitError from "../errorHandler/emitError";
import { ServerError } from "../errorHandler/ServerError";
import { PlayerPermissions } from "./PlayerPermissions";

export default async function grantPermission(socket: Socket, permission: PlayerPermissions, player: Player, ADMIN_KEY: string) {
    if(process.env.admin_key) {
        if(process.env.admin_key == ADMIN_KEY) {
            player.permission = permission;
        } else {
            await emitError(socket, ServerError.WRONG_ADMIN_KEY);
        }
    } else {
        await emitError(socket, ServerError.ADMIN_KEY_ENV_NOT_EXIST);
    }
}