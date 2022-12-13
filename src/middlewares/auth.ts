import { Request, Response, NextFunction } from "express";
import { Server } from "socket.io";
import { ApiErrorMessages } from "../errorHandler/ApiErrorMessages";
import { ApiErrors } from "../errorHandler/apiErrors";
import GameInstance from "../game/GameInstance";
import getPlayerFromSocketId from "../utils/getPlayerFromSocketId";


export default function auth(gameInstance: GameInstance, io: Server){
    return async function (req: Request, res: Response, next: NextFunction) {
        if(req.headers.authorization) {
            if(io.sockets.sockets.get(req.headers.authorization)) {
                const PLAYER = await getPlayerFromSocketId(req.headers.authorization, gameInstance.players);
                if(PLAYER.connectionStatus) {
                    next();
                } else res.status(403).json({error: ApiErrorMessages[ApiErrors.INVALID_SOCKET_ID]});
            } else res.status(403).json({error: ApiErrorMessages[ApiErrors.INVALID_API_KEY]});
        } else return res.status(403).json({ error: ApiErrorMessages[ApiErrors.INVALID_API_KEY] });    
    }
}
