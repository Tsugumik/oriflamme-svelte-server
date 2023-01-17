import Player from "../entities/Player";

export default async function getPlayerFromConnectionId(playersArray: Array<Player>, id: string): Promise<Player> {
    const result = playersArray.filter(player => {
        return player.connectionId == id;
    });

    return result[0];
}