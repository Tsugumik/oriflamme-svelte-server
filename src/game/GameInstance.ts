import Player from "../entities/Player"
import { GameState } from "./GameState";
import { MessagePacket } from "../types/MessagePacket";
import { PlayerColor } from "../types/PlayerColor";
import IGameEntity from "../interfaces/IGameEntity";
import { TableSyncObject } from "../types/TableSyncObject";
import { CardId } from "./CardId";
import Archer from "./cards/Archer";
import Spy from "./cards/Spy";

export default class GameInstance {
    public players: Array<Player>;
    public chat: Array<MessagePacket>;
    public activePlayer?: Player;
    public gameState: GameState;
    public table: Array<IGameEntity>;
    public MIN_PLAYERS = 3;
    public MAX_PLAYERS = 5;
    
    constructor() {
        this.players = new Array<Player>
        this.table = new Array<IGameEntity>(
            new Archer("1234", PlayerColor.GRAY),
            new Spy("12345", PlayerColor.RED),
            new Spy("123456", PlayerColor.YELLOW)
        );
        this.chat = new Array<MessagePacket>();
        this.gameState = GameState.LOBBY;
    }

    public async init(): Promise<boolean> {
        if(this.gameState == GameState.PLAYING) {
            return false;
        }
        if(this.players.length >= this.MIN_PLAYERS && this.players.length <= this.MAX_PLAYERS) {
            this.activePlayer = this.players[Math.floor(Math.random()*this.players.length)];
            this.gameState = GameState.PLAYING;

            this.players.forEach(async player=>{
                await player.init();
            });

            return true;
        } else {
            return false;
        }
    }



    public async getColor(): Promise<PlayerColor> {
        let playerColor: PlayerColor = PlayerColor.RED;
        
        Object.values(PlayerColor).every(key=>{
            let colorExisted = false;
            
            this.players.every(player=>{
                if(player.color == key) {
                    colorExisted = true;
                    return false;
                } else {
                    return true;
                }
            });
            
            if(!colorExisted) {
                playerColor = key;
                return false;
            } else {
                return true;
            }

        });

        return playerColor;
    }

    async getTableFor(playerId: string): Promise<Array<TableSyncObject>> {
        const DATA: Array<TableSyncObject> = new Array<TableSyncObject>();
        this.table.forEach(async card=>{
            if(card.ownerId == playerId) {
                DATA.push({id: card.id, ownerId: card.ownerId, color: card.color});
            } else {
                DATA.push({id: CardId.UNKNOWN, ownerId: card.ownerId, color: card.color});
            }
        });
        return DATA;
    }

}