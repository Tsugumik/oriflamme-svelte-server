import { PlayerPermissions } from "../permisssions/PlayerPermissions";
import { PlayerColor } from "../types/PlayerColor";

export default class Player {
    id: string;
    lastSocketId: string;
    name: string;
    connectionStatus: boolean = false;
    permission: PlayerPermissions = PlayerPermissions.STANDARD;
    color: PlayerColor = PlayerColor.YELLOW;
    constructor(id: string, name: string, lastSocketId: string) {
        this.id = id;
        this.name = name;
        this.lastSocketId = lastSocketId;
    }
    /* Returns information available to other players */
    getPublicInfo(): PlayerSyncPacket {
        return {
            name: this.name,
            connectionStatus: this.connectionStatus,
            permission: this.permission,
            color: this.color
        };
    }
}

export type PlayerSyncPacket = {name: string, connectionStatus: boolean, permission: PlayerPermissions, color: PlayerColor};