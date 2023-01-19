import express from "express";
import { Server } from "socket.io";
import Player, { PlayerSyncPacket } from "../entities/Player";
import { ApiErrorMessages } from "../errorHandler/ApiErrorMessages";
import { ApiErrors } from "../errorHandler/ApiErrors";
import GameInstance from "../game/GameInstance";
import auth from "../middlewares/auth";
import { PlayerPermissions } from "../permisssions/PlayerPermissions";
import getPlayerFromSocketId from "../utils/getPlayerFromSocketId";
import { SocketEmiters } from "../utils/SocketEmiters";

const adminRouter = express.Router();

export default function admin(gameInstance: GameInstance, io: Server, adminKey: string) {
    adminRouter.use(auth(gameInstance, io));
    
    adminRouter.get('/permission', async (req, res)=>{
        const PLAYER: Player = await getPlayerFromSocketId(req.headers.authorization, gameInstance.players);
        res.json(await PLAYER.getPermissionStatus());
    });

    adminRouter.post('/permission', async(req, res)=>{
        if(req.body.admin_key == adminKey) {
            const PLAYER: Player = await getPlayerFromSocketId(req.headers.authorization, gameInstance.players);
            PLAYER.permission = PlayerPermissions.ADMIN;
            io.local.emit(SocketEmiters.PERMISSION_SYNC);
            res.json(await PLAYER.getPermissionStatus());
        } else {
            res.status(401).json({error: ApiErrorMessages[ApiErrors.INVALID_ADMIN_KEY]});
        }
    });

    return adminRouter;
}
