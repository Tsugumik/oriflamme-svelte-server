import express from "express";
import { Server } from "socket.io";
import Player from "../entities/Player";
import { ApiErrorMessages } from "../errorHandler/ApiErrorMessages";
import { ApiErrors } from "../errorHandler/apiErrors";
import GameInstance from "../game/GameInstance";
import auth from "../middlewares/auth";
import getPlayerFromSocketId from "../utils/getPlayerFromSocketId";

const gameRouter = express.Router();

export default function game(gameInstance: GameInstance, io: Server) {
    gameRouter.use(auth(gameInstance, io));
    
    gameRouter.get('/state', async (req, res)=>{
        res.json({state: gameInstance.gameState});
    });

    gameRouter.get('/color', async(req, res)=>{
        const PLAYER: Player = await getPlayerFromSocketId(req.headers.authorization, gameInstance.players);
        const DATA = {color: PLAYER.color};
        res.json(DATA);
    });

    gameRouter.get('/hand', async(req, res)=>{
        const PLAYER: Player = await getPlayerFromSocketId(req.headers.authorization, gameInstance.players);
        const DATA = await PLAYER.getCards();
        res.json(DATA); 
    });

    gameRouter.get('/table', async(req, res)=>{
        const PLAYER = await getPlayerFromSocketId(req.headers.authorization, gameInstance.players);
        // TODO: ten route musi zwracać publiczne informacje o kartach na stole dla każdego gracza.
        // W tym ma być tak, że jeśli karta należy do pobierającego info gracza, to trzeba mu zwrócić wszystkie info itd.
        const DATA = await gameInstance.getTableFor(PLAYER.id);
        res.json(DATA);
        
    });

    gameRouter.put('/table', async(req, res)=>{
        const PLAYER = await getPlayerFromSocketId(req.headers.authorization, gameInstance.players);
        if(PLAYER == gameInstance.activePlayer) {
            // TODO: Trza zrobić logikę wkładania karty na stół
            res.json({});
        } else {
            res.status(400).json({error: ApiErrorMessages[ApiErrors.NOTACTIVEPLAYER]});
        }
    });

    return gameRouter;
}