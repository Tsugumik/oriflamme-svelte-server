import express from "express";
import { Server } from "socket.io";
import { ApiErrorMessages } from "../errorHandler/ApiErrorMessages";
import { ApiErrors } from "../errorHandler/apiErrors";
import GameInstance from "../game/GameInstance";
import adminPermission from "../middlewares/adminPermission";
import { MessagePacket } from "../types/MessagePacket";
import logToChat from "../utils/logToChat";
import { SocketEmiters } from "../utils/SocketEmiters";

const settingsRouter = express.Router();

export default function settings(gameInstance: GameInstance, io: Server) {
    settingsRouter.use(adminPermission(gameInstance, io));
    settingsRouter.get('/chat/clear', async (req, res)=>{
        gameInstance.chat = new Array<MessagePacket>();
        io.local.emit(SocketEmiters.CHAT_SYNC);
        res.json({status: "OK"});
    });
    settingsRouter.get('/game/init', async (req, res)=>{
        const INIT_STATUS = await gameInstance.init();
        if(INIT_STATUS) {
            console.log("Game initialized!");
            io.local.emit(SocketEmiters.GAME_INITIALIZED);
            await logToChat(gameInstance, io, "Game initialized!");
            res.json({status: "OK"});
        } else {
            res.status(400).json({error: ApiErrorMessages[ApiErrors.INCORRECT_NUMBER_OF_PLAYERS]});
        }
    });
    return settingsRouter;
}
