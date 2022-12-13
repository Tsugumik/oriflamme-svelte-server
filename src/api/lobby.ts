import express from "express";
import { Server } from "socket.io";
import { PlayerSyncPacket } from "../entities/Player";
import GameInstance from "../game/GameInstance";
import auth from "../middlewares/auth";

const lobbyRouter = express.Router();

export default function lobby(gameInstance: GameInstance, io: Server) {
    lobbyRouter.use(auth(gameInstance, io));
    lobbyRouter.get('/', async(req, res)=>{
        const DATA: Array<PlayerSyncPacket> = new Array<PlayerSyncPacket>();
        gameInstance.players.forEach(player=>{
            DATA.push(player.getPublicInfo());
        });
        res.json(DATA);
    });

    return lobbyRouter;
}
