import Player from "../entities/Player";

export default async function getPlayerFromId(playersArray: Array<Player>, id: string): Promise<Player> {
    const result = playersArray.filter(player => {
        return player.id == id;
    });

    return result[0];
}