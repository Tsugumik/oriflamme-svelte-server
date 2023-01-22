import express from "express";
import { Server } from "socket.io";
import Player from "../entities/Player";
import { ApiErrorMessages } from "../errorHandler/ApiErrorMessages";
import { ApiErrors } from "../errorHandler/ApiErrors";
import { CardId } from "../game/CardId";
import { CardsConstructors } from "../game/cardsConstructors";
import GameInstance from "../game/GameInstance";
import IGameEntity from "../interfaces/IGameEntity";
import auth from "../middlewares/auth";
import { TablePutObject } from "../types/TablePutObject";
import getPlayerFromSocketId from "../utils/getPlayerFromSocketId";
import isCardInPlayerHand from "../utils/isCardInPlayerHand";
import { SocketEmiters } from "../utils/SocketEmiters";

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
            const DATA: TablePutObject = await req.body;
            const cardId: CardId = DATA.id;
            const ownerShip = await isCardInPlayerHand(cardId, PLAYER);
            if(ownerShip) {
                PLAYER.hand = PLAYER.hand.filter(card => {
                    return card.id != cardId;
                });
                let new_table = Array<IGameEntity>();
                if(gameInstance.table.length > 0 && DATA.slotIndex < gameInstance.table.length) {
                    for(let i=0; i<gameInstance.table.length; i++) {
                        if(DATA.slotIndex == i) {
                            new_table.push(new CardsConstructors[cardId](PLAYER.id, PLAYER.color));
                            new_table.push(gameInstance.table[i]);
                        } else {
                            new_table.push(gameInstance.table[i]);
                        }
                    }
                } else {
                    new_table = [...gameInstance.table, new CardsConstructors[cardId](PLAYER.id, PLAYER.color)];
                }
                
                gameInstance.table = new_table;
                io.local.emit(SocketEmiters.CARDS_SYNC);
            }
            res.json({});
        } else {
            res.status(400).json({error: ApiErrorMessages[ApiErrors.NOTACTIVEPLAYER]});
        }
    });

    return gameRouter;
}