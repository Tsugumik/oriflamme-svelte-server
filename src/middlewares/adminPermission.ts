import { Request, Response, NextFunction } from "express";
import { Server } from "socket.io";
import { ApiErrorMessages } from "../errorHandler/ApiErrorMessages";
import { ApiErrors } from "../errorHandler/ApiErrors";
import GameInstance from "../game/GameInstance";
import { PlayerPermissions } from "../permisssions/PlayerPermissions";
import getPlayerFromSocketId from "../utils/getPlayerFromSocketId";


export default function adminPermission(gameInstance: GameInstance, io: Server){
    return async function (req: Request, res: Response, next: NextFunction) {
        if(req.headers.authorization) {
            if(io.sockets.sockets.get(req.headers.authorization)) {
                const PLAYER = await getPlayerFromSocketId(req.headers.authorization, gameInstance.players);
                if(PLAYER.connectionStatus) {
                    if(PLAYER.permission == PlayerPermissions.ADMIN) {
                        next();
                    } else res.status(401).json({error: ApiErrorMessages[ApiErrors.PERMISSION_LEVEL_TOO_LOW]});
                } else res.status(403).json({error: ApiErrorMessages[ApiErrors.INVALID_SOCKET_ID]});
            } else res.status(403).json({error: ApiErrorMessages[ApiErrors.INVALID_API_KEY]});
        } else return res.status(403).json({ error: ApiErrorMessages[ApiErrors.INVALID_API_KEY] });    
    }
}
