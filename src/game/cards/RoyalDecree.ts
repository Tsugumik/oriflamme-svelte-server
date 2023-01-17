import IGameEntity from "../../interfaces/IGameEntity";
import { CardId } from "../CardId";
import { PlayerColor } from "../../types/PlayerColor";
import Card from "./Card";

export default class RoyalDecree extends Card implements IGameEntity{
    id: CardId = CardId.ROYALDECREE;
    name = "Royal Decree";
    imageUrl = "/cards/royaldecree.jpg";
    details = "Przenieś i umieść kartę w dowolnym miejscu w kolejce, za wyjątkiem umieszczenia jej na innej karcie. Odrzuć tą kartę.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: PlayerColor) {
        super(ownerId, color);
    }
}