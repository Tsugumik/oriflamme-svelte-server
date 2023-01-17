import IGameEntity from "../../interfaces/IGameEntity";
import { CardId } from "../CardId";
import { PlayerColor } from "../../types/PlayerColor";
import Card from "./Card";

export default class Heir extends Card implements IGameEntity{
    id: CardId = CardId.HEIR;
    name = "Heir";
    imageUrl = "/cards/heir.jpg";
    details = "Jeżeli nie ma innej ujawnionej karty o tej nazwie, otrzymujesz dwa punkty.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: PlayerColor) {
        super(ownerId, color);
    }
}