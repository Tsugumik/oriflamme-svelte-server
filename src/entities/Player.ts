import { PlayerPermissions } from "../permisssions/PlayerPermissions";

export default class Player {
    id: string;
    lastSocketId: string;
    name: string;
    connectionStatus: boolean = false;
    permission: PlayerPermissions = PlayerPermissions.STANDARD;
    constructor(id: string, name: string, lastSocketId: string) {
        this.id = id;
        this.name = name;
        this.lastSocketId = lastSocketId;
    }
}
