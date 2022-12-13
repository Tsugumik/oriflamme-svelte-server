import express from "express";
import { Server } from "socket.io";
import { PlayerSyncPacket } from "../entities/Player";
import GameInstance from "../game/GameInstance";
import adminAuth from "../middlewares/adminAuth";

const adminRouter = express.Router();

export default function admin(gameInstance: GameInstance, io: Server, adminKey: string) {
    adminRouter.use(adminAuth(gameInstance, io, adminKey));
    
    adminRouter.get('', async (req, res)=>{
        res.json({});
    });
    return adminRouter;
}
