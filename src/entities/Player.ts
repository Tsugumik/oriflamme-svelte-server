import { CardId } from "../game/CardId";
import Ambush from "../game/cards/Ambush";
import Archer from "../game/cards/Archer";
import Assasination from "../game/cards/Assassination";
import Conspiracy from "../game/cards/Conspiracy";
import Heir from "../game/cards/Heir";
import Impostor from "../game/cards/Impostor";
import Knight from "../game/cards/Knight";
import Lord from "../game/cards/Lord";
import RoyalDecree from "../game/cards/RoyalDecree";
import Spy from "../game/cards/Spy";
import { CardsConstructors, cardsConstructorsArray } from "../game/cardsConstructors";
import IGameEntity from "../interfaces/IGameEntity";
import { PlayerPermissions } from "../permisssions/PlayerPermissions";
import { PlayerColor } from "../types/PlayerColor";

export default class Player {
    id: string;
    connectionId: string;
    lastSocketId: string;
    name: string;
    connectionStatus: boolean = false;
    permission: PlayerPermissions = PlayerPermissions.STANDARD;
    color: PlayerColor;
    hand: Array<IGameEntity>;
    constructor(id: string, name: string, lastSocketId: string, color: PlayerColor, connectionId: string) {
        this.id = id;
        this.connectionId = connectionId;
        this.name = name;
        this.lastSocketId = lastSocketId;
        this.color = color;
        this.hand = new Array<IGameEntity>();
    }

    /* Returns information available to other players */
    getPublicInfo(): PlayerSyncPacket {
        return {
            name: this.name,
            connectionStatus: this.connectionStatus,
            permission: this.permission,
            color: this.color,
            id: this.id
        };
    }

    async getPermissionStatus(): Promise<PlayerPermissionPacket>{
        return {status: this.permission};
    }

    async init() {
        cardsConstructorsArray.forEach(async constr=>{
            this.hand.push(new constr(this.id, this.color));
        });

        for(let i=0; i<3; i++) {
            this.hand.splice(Math.random() * this.hand.length, 1);
        }
    }

    async getCards(): Promise<Array<CardId>> {
        const DATA: Array<CardId> = new Array<CardId>();
        this.hand.forEach(async card=>{
            DATA.push(card.id);
        });
        return DATA;
    }
}

export type PlayerSyncPacket = {name: string, connectionStatus: boolean, permission: PlayerPermissions, color: PlayerColor, id: string};
export type PlayerPermissionPacket = {status: PlayerPermissions};