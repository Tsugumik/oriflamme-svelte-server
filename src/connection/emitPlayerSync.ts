import { Server, Socket } from "socket.io";
import Player, { PlayerSyncPacket } from "../entities/Player";
import { SOCKET_EMITERS } from "../utils/SOCKET_EMITERS";

export default async function emitPlayerSync(globalIoServer: Server, playerArray: Array<Player>) {
    const PLAYER_SYNC_PACKET: Array<PlayerSyncPacket> = new Array<PlayerSyncPacket>(); 
    
    playerArray.forEach(player=>{
        PLAYER_SYNC_PACKET.push(player.getPublicInfo());    
    });
    
    globalIoServer.local.emit(SOCKET_EMITERS.PLAYER_SYNC, JSON.stringify(PLAYER_SYNC_PACKET));

    return;
}