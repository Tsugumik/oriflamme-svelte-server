import IGameEntity from "../../interfaces/IGameEntity";
import { CardId } from "../CardId";
import { PlayerColor } from "../../types/PlayerColor";
import Card from "./Card";

export default class UnknownCard extends Card implements IGameEntity{
    id: CardId = CardId.UNKNOWN;
    name = "UNKNOWN";
    imageUrl = "";
    details = "UNKNOWN";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: PlayerColor) {
        super(ownerId, color);
    }
}