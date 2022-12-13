import { Request, Response, NextFunction } from "express";
import { Server } from "socket.io";
import { ApiErrorMessages } from "../errorHandler/ApiErrorMessages";
import { ApiErrors } from "../errorHandler/apiErrors";
import GameInstance from "../game/GameInstance";
import { AuthHeader } from "../types/AuthHeader";
import getPlayerFromSocketId from "../utils/getPlayerFromSocketId";


export default function adminAuth(gameInstance: GameInstance, io: Server, adminKey: string){
    return async function (req: Request, res: Response, next: NextFunction) {
        if(req.headers.authorization) {
            const AUTH_HEADER: AuthHeader = JSON.parse(req.headers.authorization);
            if(io.sockets.sockets.get(AUTH_HEADER.socketId)) {
                if(AUTH_HEADER.adminKey == adminKey) {
                    const PLAYER = await getPlayerFromSocketId(AUTH_HEADER.socketId, gameInstance.players);
                    if(PLAYER.connectionStatus) {
                        next();
                    } else res.status(403).json({error: ApiErrorMessages[ApiErrors.INVALID_SOCKET_ID]});
                } else res.status(403).json({error: ApiErrorMessages[ApiErrors.INVALID_ADMIN_KEY]})
            } else res.status(403).json({error: ApiErrorMessages[ApiErrors.INVALID_API_KEY]});
        } else return res.status(403).json({ error: ApiErrorMessages[ApiErrors.INVALID_API_KEY] });    
    }
}
