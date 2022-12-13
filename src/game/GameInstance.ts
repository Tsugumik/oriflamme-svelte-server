import Player from "../entities/Player"
import crypto from "crypto";
import { GameState } from "./GameState";
import { PlayersObject } from "../types/PlayersObject";
import { MessagePacket } from "../types/MessagePacket";
import Table from "./Table";

export default class GameInstance {
    public players: Array<Player>;
    public chat: Array<MessagePacket>;
    public gameId: string;
    public activePlayer?: Player;
    public gameState: GameState;
    public table: Table;
    public MIN_PLAYERS = 3;
    public MAX_PLAYERS = 5;
    constructor() {
        this.players = new Array<Player>
        this.table = new Table();
        this.chat = new Array<MessagePacket>;
        this.gameState = GameState.LOBBY;
        this.gameId = "123";//crypto.randomUUID();
    }

    public async init() {
        if(this.players.length >= this.MIN_PLAYERS && this.players.length <= this.MAX_PLAYERS) {
            this.gameState = GameState.PLAYING;
        }
    }

}