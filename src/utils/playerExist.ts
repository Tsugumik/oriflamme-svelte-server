import Player from "../entities/Player";

export default async function playerExist(playersArray: Array<Player>, playerId: string): Promise<boolean>{
    const result = playersArray.filter(player =>{
        return player.id == playerId;
    });

    if(result.length == 1) {
        return true;
    } else {
        return false;
    }
}