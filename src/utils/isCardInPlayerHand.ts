import Player from "../entities/Player";
import { CardId } from "../game/CardId";

export default async function isCardInPlayerHand(cardId: CardId, player: Player): Promise<boolean> {
    const cards = player.hand.filter(element=>{
        return element.id == cardId;
    });
    if(cards.length == 1) {
        return true;
    } else {
        return false;
    }
}