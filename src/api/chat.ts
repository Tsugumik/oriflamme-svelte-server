import express from "express";
import { Server } from "socket.io";
import { ApiErrorMessages } from "../errorHandler/ApiErrorMessages";
import { ApiErrors } from "../errorHandler/apiErrors";
import GameInstance from "../game/GameInstance";
import auth from "../middlewares/auth";
import { MessagePacket } from "../types/MessagePacket";
import getPlayerFromSocketId from "../utils/getPlayerFromSocketId";
import { SocketEmiters } from "../utils/SocketEmiters";

const chatRouter = express.Router();

export default function chat(gameInstance: GameInstance, io: Server) {
    chatRouter.use(auth(gameInstance, io));
    chatRouter.get('/', async (req, res)=>{
        res.json(gameInstance.chat);
    });

    chatRouter.put('/', async (req, res)=>{
        const PLAYER = await getPlayerFromSocketId(req.headers.authorization, gameInstance.players);
        if(PLAYER.connectionStatus) {
            if(req.body.message.length > 130) {
                res.status(404).json({error: ApiErrorMessages[ApiErrors.VALIDATION_ERROR]});
            } else {
                const DATE = new Date();
                const TIME = `${DATE.getHours()}:${DATE.getMinutes()}:${DATE.getSeconds()}`;
                const MSG_PACKET: MessagePacket = { sender: PLAYER.name, senderid: PLAYER.id, message: req.body.message, time: TIME };
                gameInstance.chat.push(MSG_PACKET);
                io.local.emit(SocketEmiters.CHAT_SYNC);
                res.status(201).json(MSG_PACKET);
            }
        } else res.status(400).json({error: ApiErrorMessages[ApiErrors.INVALID_SOCKET_ID]});
    });

    return chatRouter;
}